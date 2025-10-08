# 🔧 BROOLYKID Backend API

Backend Express.js + MongoDB + Mistral AI pour La Fondation BROOLYKID.

---

## 🚀 Installation Locale

```bash
cd backend
npm install
cp env.template .env
# Éditez .env avec vos credentials
npm run dev
```

---

## 📡 Endpoints API

### Authentification

#### POST `/api/auth/register`
Créer un nouveau compte utilisateur.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### POST `/api/auth/login`
Se connecter.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Obtenir l'utilisateur actuel (authentifié).

**Headers:** `x-auth-token: jwt-token`

---

### Profils Enfants

#### GET `/api/profiles`
Liste tous les profils de l'utilisateur.

**Headers:** `x-auth-token: jwt-token`

#### POST `/api/profiles`
Créer un nouveau profil enfant.

**Body:**
```json
{
  "childName": "Emma",
  "birthDate": "2024-01-15",
  "currentPhase": "Delta",
  "gender": "female",
  "notes": "Aime la musique"
}
```

#### PUT `/api/profiles/:id/progress`
Mettre à jour la progression d'une phase.

**Body:**
```json
{
  "phase": "Delta",
  "progress": 75
}
```

#### POST `/api/profiles/:id/activity`
Ajouter une activité.

**Body:**
```json
{
  "activity": "Massage énergétique",
  "notes": "10 minutes avec huile de sésame",
  "phase": "Delta"
}
```

---

### BroolyAI

#### POST `/api/broolyai/chat`
Chat avec l'assistant IA.

**Body:**
```json
{
  "message": "Qu'est-ce que la Phase Alpha?",
  "conversationHistory": [],
  "profileId": "optional-profile-id"
}
```

#### POST `/api/broolyai/phase-guidance`
Obtenir des conseils pour une phase spécifique.

**Body:**
```json
{
  "phase": "Delta",
  "profileId": "profile-id"
}
```

#### POST `/api/broolyai/suggest-activities`
Obtenir des suggestions d'activités.

**Body:**
```json
{
  "profileId": "profile-id",
  "preferences": "activités calmes"
}
```

---

## 🔒 Variables d'Environnement

Créez un fichier `.env` basé sur `env.template`:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-secret-key
MISTRAL_API_KEY=your-mistral-key
PORT=5000
NODE_ENV=production
```

---

## 📦 Déploiement

### Sur Render.com (Gratuit)

1. Créez un compte sur https://render.com/
2. Connectez votre repo GitHub
3. Créez un nouveau Web Service:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Ajoutez les variables d'environnement
5. Déployez!

**Voir guide complet:** `FONDATION_IMPLEMENTATION_GUIDE.md`

---

## 🧪 Tests

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"password123"}'
```

---

## 🛠 Technologies

- **Express.js** - Framework web
- **MongoDB + Mongoose** - Base de données
- **JWT** - Authentification
- **Mistral AI** - Assistant IA
- **Bcrypt** - Hashage passwords

---

## 📞 Support

- Documentation: `FONDATION_IMPLEMENTATION_GUIDE.md`
- Issues: GitHub Issues
- Logs: Render Dashboard

**Bon développement! 🚀**

