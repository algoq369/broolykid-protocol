/**
 * Dashboard Management
 * Main dashboard logic and profile management
 */

let profiles = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  if (!window.apiService || !window.apiService.token) {
    window.location.href = 'index.html';
    return;
  }

  // Load user info
  currentUser = JSON.parse(localStorage.getItem('broolykid_user') || '{}');
  const userNameEl = document.getElementById('user-name');
  if (userNameEl) {
    userNameEl.textContent = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`;
  }

  // Load profiles
  await loadProfiles();

  // Setup event listeners
  setupEventListeners();
});

async function loadProfiles() {
  try {
    profiles = await window.apiService.getProfiles();
    renderProfiles();
    updateStats();
    loadRecentActivities();
    updateChatSelector();
  } catch (error) {
    console.error('Load profiles error:', error);
    if (error.message.includes('Token invalide') || error.message.includes('autorisation refusée')) {
      alert('Session expirée, veuillez vous reconnecter');
      window.apiService.clearToken();
      window.location.href = 'index.html';
    } else {
      alert('Erreur de chargement des profils: ' + error.message);
    }
  }
}

function renderProfiles() {
  const container = document.getElementById('profiles-container');
  
  if (!container) return;

  if (profiles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">👶</div>
        <p>Aucun profil d'enfant créé</p>
        <p class="empty-hint">Cliquez sur "Ajouter un enfant" pour commencer votre parcours</p>
      </div>
    `;
    return;
  }

  container.innerHTML = profiles.map(profile => `
    <div class="profile-card" data-id="${profile._id}">
      <div class="profile-header">
        <div class="profile-avatar">
          ${profile.gender === 'male' ? '👦' : profile.gender === 'female' ? '👧' : '👶'}
        </div>
        <div class="profile-info">
          <h3 class="profile-name">${escapeHtml(profile.childName)}</h3>
          <p class="profile-age">${profile.age}</p>
        </div>
      </div>

      <div class="profile-phase">
        <div class="phase-badge phase-${profile.currentPhase.toLowerCase()}">
          Phase ${profile.currentPhase}
        </div>
        <div class="phase-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${profile.phaseProgress[profile.currentPhase] || 0}%"></div>
          </div>
          <span class="progress-text">${profile.phaseProgress[profile.currentPhase] || 0}%</span>
        </div>
      </div>

      <div class="profile-stats">
        <div class="profile-stat">
          <span class="stat-icon">📝</span>
          <span>${profile.activities?.length || 0} activités</span>
        </div>
        <div class="profile-stat">
          <span class="stat-icon">🎯</span>
          <span>${profile.milestones?.length || 0} étapes</span>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn-small btn-primary" onclick="openChatForProfile('${profile._id}')">
          💬 Chat
        </button>
        <button class="btn-small btn-secondary" onclick="editProfile('${profile._id}')">
          ✏️ Modifier
        </button>
      </div>
    </div>
  `).join('');
}

function updateStats() {
  const totalChildren = profiles.length;
  const totalActivities = profiles.reduce((sum, p) => sum + (p.activities?.length || 0), 0);
  const totalMilestones = profiles.reduce((sum, p) => sum + (p.milestones?.length || 0), 0);
  
  const avgProgress = profiles.length > 0
    ? Math.round(
        profiles.reduce((sum, p) => {
          const phaseProgress = p.phaseProgress[p.currentPhase] || 0;
          return sum + phaseProgress;
        }, 0) / profiles.length
      )
    : 0;

  const totalChildrenEl = document.getElementById('total-children');
  const totalActivitiesEl = document.getElementById('total-activities');
  const totalMilestonesEl = document.getElementById('total-milestones');
  const totalProgressEl = document.getElementById('total-progress');

  if (totalChildrenEl) totalChildrenEl.textContent = totalChildren;
  if (totalActivitiesEl) totalActivitiesEl.textContent = totalActivities;
  if (totalMilestonesEl) totalMilestonesEl.textContent = totalMilestones;
  if (totalProgressEl) totalProgressEl.textContent = `${avgProgress}%`;
}

function loadRecentActivities() {
  const container = document.getElementById('recent-activities');
  if (!container) return;
  
  // Flatten all activities
  const allActivities = profiles.flatMap(profile => 
    (profile.activities || []).map(activity => ({
      ...activity,
      childName: profile.childName,
      profileId: profile._id
    }))
  );

  allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentActivities = allActivities.slice(0, 10);

  if (recentActivities.length === 0) {
    container.innerHTML = `
      <div class="empty-activities">
        <p>Aucune activité enregistrée</p>
      </div>
    `;
    return;
  }

  container.innerHTML = recentActivities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">✨</div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="activity-child">${escapeHtml(activity.childName)}</span>
          <span class="activity-phase">${activity.phase}</span>
        </div>
        <p class="activity-text">${escapeHtml(activity.activity)}</p>
        ${activity.notes ? `<p class="activity-notes">${escapeHtml(activity.notes)}</p>` : ''}
        <span class="activity-date">${formatDate(activity.date)}</span>
      </div>
    </div>
  `).join('');
}

function updateChatSelector() {
  const selector = document.getElementById('chat-profile-selector');
  if (!selector) return;
  
  selector.innerHTML = `
    <option value="">Général</option>
    ${profiles.map(p => `
      <option value="${p._id}">${escapeHtml(p.childName)} (${p.currentPhase})</option>
    `).join('')}
  `;
}

function setupEventListeners() {
  // Add child button
  const addChildBtn = document.getElementById('add-child-btn');
  if (addChildBtn) {
    addChildBtn.addEventListener('click', () => {
      document.getElementById('add-child-modal').style.display = 'flex';
    });
  }

  // Cancel add child
  const cancelBtn = document.getElementById('cancel-add-child');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      document.getElementById('add-child-modal').style.display = 'none';
      document.getElementById('add-child-form').reset();
    });
  }

  // Close modal
  const closeModal = document.querySelector('.modal-close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      document.getElementById('add-child-modal').style.display = 'none';
    });
  }

  // Add child form submit
  const addChildForm = document.getElementById('add-child-form');
  if (addChildForm) {
    addChildForm.addEventListener('submit', handleAddChild);
  }

  // Logout
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Voulez-vous vraiment vous déconnecter?')) {
        window.apiService.clearToken();
        localStorage.removeItem('broolykid_user');
        window.location.href = 'index.html';
      }
    });
  }

  // BroolyAI link
  const broolyAILink = document.getElementById('broolyai-link');
  if (broolyAILink) {
    broolyAILink.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('broolyai-sidebar');
      if (sidebar) {
        sidebar.classList.add('active');
      }
    });
  }
}

async function handleAddChild(e) {
  e.preventDefault();

  const profileData = {
    childName: document.getElementById('child-name').value,
    birthDate: document.getElementById('birth-date').value,
    gender: document.getElementById('child-gender').value,
    currentPhase: document.getElementById('current-phase').value,
    notes: document.getElementById('child-notes').value
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.textContent = 'Création...';
    submitBtn.disabled = true;

    await window.apiService.createProfile(profileData);
    
    // Close modal
    document.getElementById('add-child-modal').style.display = 'none';
    document.getElementById('add-child-form').reset();
    
    // Reload profiles
    await loadProfiles();
    
    alert('✅ Profil créé avec succès!');
  } catch (error) {
    console.error('Create profile error:', error);
    alert('❌ Erreur: ' + error.message);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Global functions for onclick handlers
window.openChatForProfile = function(profileId) {
  const selector = document.getElementById('chat-profile-selector');
  if (selector) {
    selector.value = profileId;
  }
  
  const sidebar = document.getElementById('broolyai-sidebar');
  if (sidebar) {
    sidebar.classList.add('active');
    
    setTimeout(() => {
      const chatInput = document.getElementById('chat-input');
      if (chatInput) chatInput.focus();
    }, 300);
  }
};

window.editProfile = function(profileId) {
  // TODO: Implement profile editing
  alert('Fonctionnalité en cours de développement');
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

