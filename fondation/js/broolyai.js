/**
 * BroolyAI Chat Interface
 * Handles AI conversations with context
 */

let conversationHistory = [];
let isProcessing = false;

document.addEventListener('DOMContentLoaded', () => {
  setupChatEventListeners();
  loadConversationHistory();
});

function setupChatEventListeners() {
  // Close sidebar
  const closeSidebar = document.getElementById('close-sidebar');
  if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
      const sidebar = document.getElementById('broolyai-sidebar');
      if (sidebar) sidebar.classList.remove('active');
    });
  }

  // Send message
  const sendBtn = document.getElementById('send-chat-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  // Enter to send
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Quick actions
  document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', handleQuickAction);
  });

  // Profile selector change
  const profileSelector = document.getElementById('chat-profile-selector');
  if (profileSelector) {
    profileSelector.addEventListener('change', (e) => {
      if (e.target.value) {
        const profile = (window.profiles || []).find(p => p._id === e.target.value);
        addSystemMessage(`Contexte changé pour ${profile ? profile.childName : 'cet enfant'}`);
      } else {
        addSystemMessage('Mode général activé');
      }
    });
  }
}

async function sendMessage() {
  if (isProcessing) return;

  const input = document.getElementById('chat-input');
  if (!input) return;

  const message = input.value.trim();
  if (!message) return;

  // Clear input
  input.value = '';
  input.style.height = 'auto';

  // Add user message to UI
  addMessageToChat('user', message);

  // Add to conversation history
  conversationHistory.push({
    role: 'user',
    content: message
  });

  // Show typing indicator
  showTypingIndicator();
  isProcessing = true;

  try {
    const profileSelector = document.getElementById('chat-profile-selector');
    const profileId = profileSelector ? profileSelector.value : null;

    const response = await window.apiService.chat(
      message,
      conversationHistory.slice(-10), // Keep last 10 messages for context
      profileId || null
    );

    removeTypingIndicator();
    addMessageToChat('assistant', response.message);

    conversationHistory.push({
      role: 'assistant',
      content: response.message
    });

    saveConversationHistory();

  } catch (error) {
    console.error('Chat error:', error);
    removeTypingIndicator();
    addMessageToChat('assistant', '❌ Désolé, une erreur est survenue. ' + 
      (error.message.includes('Timeout') ? 'Le serveur met trop de temps à répondre.' : 'Pouvez-vous reformuler?'));
  } finally {
    isProcessing = false;
  }
}

async function handleQuickAction(e) {
  const action = e.target.dataset.action;
  const profileSelector = document.getElementById('chat-profile-selector');
  const profileId = profileSelector ? profileSelector.value : null;

  if (!profileId) {
    alert('Veuillez sélectionner un enfant pour cette action');
    return;
  }

  showTypingIndicator();

  try {
    if (action === 'phase-guidance') {
      const profile = (window.profiles || []).find(p => p._id === profileId);
      if (!profile) {
        throw new Error('Profil non trouvé');
      }

      const response = await window.apiService.getPhaseGuidance(
        profile.currentPhase,
        profileId
      );

      removeTypingIndicator();
      addMessageToChat('assistant', response.guidance);

    } else if (action === 'suggest-activities') {
      const response = await window.apiService.suggestActivities(profileId);
      removeTypingIndicator();
      addMessageToChat('assistant', response.activities);
    }

  } catch (error) {
    console.error('Quick action error:', error);
    removeTypingIndicator();
    addMessageToChat('assistant', '❌ Une erreur est survenue: ' + error.message);
  }
}

function addMessageToChat(role, content) {
  const container = document.getElementById('chat-container');
  if (!container) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${role}`;

  if (role === 'assistant') {
    messageDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="message-bubble">${formatMessage(content)}</div>
        <div class="message-time">${new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}</div>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-bubble">${escapeHtml(content)}</div>
        <div class="message-time">${new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}</div>
      </div>
      <div class="message-avatar">👤</div>
    `;
  }

  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

function addSystemMessage(content) {
  const container = document.getElementById('chat-container');
  if (!container) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message system';
  messageDiv.innerHTML = `
    <div class="system-message">${escapeHtml(content)}</div>
  `;

  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById('chat-container');
  if (!container) return;
  
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message assistant typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="typing-bubble">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

function formatMessage(content) {
  let formatted = escapeHtml(content);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\n/g, '<br>');
  formatted = formatted.replace(/^(\d+)\.\s(.+)$/gm, '<div class="list-item">$1. $2</div>');
  formatted = formatted.replace(/^•\s(.+)$/gm, '<div class="list-item">• $1</div>');
  return formatted;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function saveConversationHistory() {
  localStorage.setItem('broolyai_conversation', JSON.stringify(conversationHistory.slice(-20)));
}

function loadConversationHistory() {
  const saved = localStorage.getItem('broolyai_conversation');
  if (saved) {
    try {
      conversationHistory = JSON.parse(saved);
      conversationHistory.slice(-10).forEach(msg => {
        addMessageToChat(msg.role, msg.content);
      });
    } catch (e) {
      console.error('Error loading conversation:', e);
    }
  } else {
    addMessageToChat('assistant', 
      'Bonjour! 👋 Je suis BroolyAI, votre assistant personnel pour le Protocole BROOLYKID.\n\n' +
      'Comment puis-je vous aider aujourd\'hui? Vous pouvez me poser des questions sur:\n' +
      '• Les phases du protocole\n' +
      '• Des conseils personnalisés pour votre enfant\n' +
      '• Des suggestions d\'activités\n' +
      '• Tout autre sujet lié au développement de l\'enfant'
    );
  }
}

