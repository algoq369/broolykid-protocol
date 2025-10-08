/**
 * Authentication Handler
 * Manages login and registration
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.querySelector('.close');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // Check if already logged in
  if (window.apiService && window.apiService.token) {
    window.location.href = 'dashboard.html';
    return;
  }

  if (!loginBtn || !registerBtn) return;

  // Open modal
  loginBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    showLoginForm();
  });

  registerBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    showRegisterForm();
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Switch forms
  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
  });

  function showLoginForm() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  }

  function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }

  // Login handler
  loginForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = 'Connexion...';
      submitBtn.disabled = true;

      const response = await window.apiService.login({ email, password });
      
      window.apiService.setToken(response.token);
      localStorage.setItem('broolykid_user', JSON.stringify(response.user));
      
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert('❌ Erreur de connexion: ' + error.message);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  // Register handler
  registerForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
      firstName: document.getElementById('register-firstname').value,
      lastName: document.getElementById('register-lastname').value,
      email: document.getElementById('register-email').value,
      password: document.getElementById('register-password').value
    };

    // Client-side validation
    if (userData.password.length < 6) {
      alert('❌ Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = 'Inscription...';
      submitBtn.disabled = true;

      const response = await window.apiService.register(userData);
      
      window.apiService.setToken(response.token);
      localStorage.setItem('broolykid_user', JSON.stringify(response.user));
      
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert('❌ Erreur d\'inscription: ' + error.message);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});

