#!/bin/bash

# 🚀 Script de Création Automatique - La Fondation BROOLYKID
# Crée tous les fichiers backend et frontend nécessaires

echo "🎯 Création de La Fondation BROOLYKID..."
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "index.html" ]; then
    echo "❌ Erreur: Exécutez ce script depuis /Users/sheirraza/igloo-inspired-website/"
    exit 1
fi

# Créer la structure de dossiers
echo "📁 Création de la structure..."
mkdir -p backend/routes
mkdir -p backend/models
mkdir -p backend/middleware
mkdir -p backend/config
mkdir -p fondation/js
mkdir -p fondation/styles

echo "✅ Structure créée"
echo ""

# Message de confirmation
echo "📦 Structure de dossiers créée avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo ""
echo "1. Les fichiers vont être créés individuellement via le script Python"
echo "2. Installez les dépendances backend : cd backend && npm install"
echo "3. Configurez .env avec vos credentials"
echo "4. Testez localement : npm run dev"
echo "5. Suivez FONDATION_IMPLEMENTATION_GUIDE.md pour le déploiement"
echo ""
echo "✨ La structure est prête !"

