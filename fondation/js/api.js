/**
 * API Service
 * Handles all communication with backend
 */

const API_CONFIG = {
  // PRODUCTION - Changez cette URL après déploiement sur Render
  BASE_URL: 'https://broolykid-backend.onrender.com/api',
  
  // LOCAL DEV - Décommentez pour développement local
  // BASE_URL: 'http://localhost:5000/api',
  
  TIMEOUT: 15000
};

class APIService {
  constructor() {
    this.token = localStorage.getItem('broolykid_token');
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['x-auth-token'] = this.token;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const config = {
      ...options,
      headers: this.getHeaders()
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout: Le serveur met trop de temps à répondre');
      }
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // AUTH
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async getMe() {
    return this.request('/auth/me', {
      method: 'GET'
    });
  }

  // PROFILES
  async getProfiles() {
    return this.request('/profiles', { method: 'GET' });
  }

  async getProfile(id) {
    return this.request(`/profiles/${id}`, { method: 'GET' });
  }

  async createProfile(profileData) {
    return this.request('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  }

  async updateProfile(id, profileData) {
    return this.request(`/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async updateProgress(profileId, phaseData) {
    return this.request(`/profiles/${profileId}/progress`, {
      method: 'PUT',
      body: JSON.stringify(phaseData)
    });
  }

  async addActivity(profileId, activityData) {
    return this.request(`/profiles/${profileId}/activity`, {
      method: 'POST',
      body: JSON.stringify(activityData)
    });
  }

  async addMilestone(profileId, milestoneData) {
    return this.request(`/profiles/${profileId}/milestone`, {
      method: 'POST',
      body: JSON.stringify(milestoneData)
    });
  }

  async deleteProfile(id) {
    return this.request(`/profiles/${id}`, {
      method: 'DELETE'
    });
  }

  // BROOLYAI
  async chat(message, conversationHistory = [], profileId = null) {
    return this.request('/broolyai/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversationHistory,
        profileId
      })
    });
  }

  async getPhaseGuidance(phase, profileId) {
    return this.request('/broolyai/phase-guidance', {
      method: 'POST',
      body: JSON.stringify({ phase, profileId })
    });
  }

  async suggestActivities(profileId, preferences = null) {
    return this.request('/broolyai/suggest-activities', {
      method: 'POST',
      body: JSON.stringify({ profileId, preferences })
    });
  }

  // TOKEN MANAGEMENT
  setToken(token) {
    this.token = token;
    localStorage.setItem('broolykid_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('broolykid_token');
  }

  isAuthenticated() {
    return !!this.token;
  }
}

// Export global instance
window.apiService = new APIService();

