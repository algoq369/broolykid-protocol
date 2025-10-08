# 🎨 La Fondation BROOLYKID - Frontend

Interface web pour suivre la progression des enfants à travers le Protocole BROOLYKID.

---

## 📁 Structure

```
fondation/
├── index.html          # Page d'accueil + Auth
├── dashboard.html      # Dashboard principal
├── js/
│   ├── api.js         # Service API centralisé
│   ├── auth.js        # Gestion authentification
│   ├── dashboard.js   # Logique dashboard
│   └── broolyai.js    # Interface chat IA
└── styles/
    ├── fondation.css  # Styles page accueil
    └── dashboard.css  # Styles dashboard
```

---

## 🚀 Fonctionnalités

### 1. Authentification
- Inscription utilisateur
- Connexion avec JWT
- Session persistante

### 2. Profils Enfants
- Création illimitée de profils
- Suivi par phase (8 phases du protocole)
- Journal d'activités
- Milestones tracking

### 3. BroolyAI Assistant 🤖
- Chat IA contextuel
- Conseils personnalisés par phase et âge
- Suggestions d'activités adaptées
- Historique de conversation

### 4. Dashboard Interactif
- Vue d'ensemble statistiques
- Profils enfants en cards
- Activités récentes
- Sidebar BroolyAI

---

## 🔗 Configuration

### Connexion au Backend

Dans `js/api.js`, configurez l'URL du backend:

```javascript
const API_CONFIG = {
  BASE_URL: 'https://broolykid-backend.onrender.com/api',
  // Pour dev local: 'http://localhost:5000/api'
};
```

---

## 🎨 Design System

### Couleurs
- Gradient principal: `#667eea → #764ba2`
- Glassmorphism: `rgba(255,255,255,0.15)` + `backdrop-filter: blur(15px)`

### Phases Colors
- Alpha (Préconception): `#ff6b6b`
- Bêta (Grossesse): `#4ecdc4`
- Charlie (Naissance): `#45b7d1`
- Delta (Fondation): `#96ceb4`
- Echo (Programmation): `#ffeaa7`
- Foxtrot (Conscience): `#dfe6e9`
- Golf (Développement): `#74b9ff`
- Hotel (Intégration): `#a29bfe`

---

## 📱 Responsive

- **Mobile** (< 768px): Stack vertical, sidebar fullscreen
- **Tablet** (768-1024px): Grid adaptatif
- **Desktop** (> 1024px): Layout complet

---

## 🧪 Tests Manuels

### Test Inscription
1. Ouvrir `fondation/index.html`
2. Cliquer "Créer un compte"
3. Remplir formulaire
4. Vérifier redirection vers dashboard

### Test Création Profil
1. Dashboard → "Ajouter un enfant"
2. Remplir informations
3. Vérifier affichage carte profil

### Test BroolyAI
1. Cliquer "BroolyAI"
2. Sélectionner un enfant
3. Cliquer "Conseils Phase Actuelle"
4. Vérifier réponse IA

---

## 🔒 Sécurité

### Bonnes Pratiques Implémentées
- ✅ Sanitization input (escapeHtml)
- ✅ JWT stocké en localStorage
- ✅ CORS configuré côté backend
- ✅ Timeout sur requêtes API
- ✅ Gestion erreurs robuste

### À Ajouter
- [ ] CSP headers
- [ ] Rate limiting client-side
- [ ] 2FA (futur)

---

## 📊 Performance

- **Chargement initial**: ~2s
- **API calls**: 500-2000ms (dépend backend)
- **Chat IA**: 2-5s (Mistral AI)

### Optimisations
- Lazy loading des conversations
- Limite historique (20 messages max)
- Timeout configurable
- Fallback sur erreurs

---

## 🐛 Troubleshooting

### "Erreur de connexion au backend"
- Vérifiez que `BASE_URL` est correcte dans `api.js`
- Vérifiez que le backend est démarré
- Vérifiez la console navigateur (F12)

### "Session expirée"
- Reconnectez-vous
- Videz le cache si nécessaire
- Vérifiez la validité du JWT

### "BroolyAI ne répond pas"
- Vérifiez la clé Mistral AI
- Vérifiez le quota (200 req/mois gratuit)
- Consultez les logs backend

---

## 🔗 Liens Utiles

- **Site principal**: https://algoq369.github.io/broolykid-protocol/
- **La Fondation**: https://algoq369.github.io/broolykid-protocol/fondation/
- **Guide complet**: `FONDATION_IMPLEMENTATION_GUIDE.md`

---

## 🎉 Prochaines Fonctionnalités

- [ ] Page profil détaillée par enfant
- [ ] Export PDF du suivi
- [ ] Notifications push
- [ ] Mode hors-ligne (PWA)
- [ ] Partage de profil entre parents
- [ ] Multilingue (EN, AR, ES)

---

**Créé avec 💙 pour les familles BROOLYKID**

