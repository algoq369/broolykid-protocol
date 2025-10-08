const express = require('express');
const router = express.Router();
const { chatWithBroolyAI } = require('../config/mistral');
const auth = require('../middleware/auth');
const ChildProfile = require('../models/ChildProfile');

// @route   POST /api/broolyai/chat
// @desc    Chat with BroolyAI
// @access  Private
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, conversationHistory, profileId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message requis' });
    }

    // Get child context if profileId provided
    let childContext = null;
    if (profileId) {
      const profile = await ChildProfile.findOne({
        _id: profileId,
        userId: req.user.id
      });

      if (profile) {
        childContext = {
          childName: profile.childName,
          age: profile.age,
          currentPhase: profile.currentPhase,
          phaseProgress: profile.phaseProgress[profile.currentPhase] || 0,
          challenges: profile.notes
        };
      }
    }

    const response = await chatWithBroolyAI(
      message,
      conversationHistory || [],
      childContext
    );

    if (response.success) {
      res.json({
        message: response.message,
        usage: response.usage,
        timestamp: new Date()
      });
    } else {
      res.status(500).json({ 
        error: response.error,
        fallbackMessage: response.fallbackMessage
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   POST /api/broolyai/phase-guidance
// @desc    Get phase-specific guidance
// @access  Private
router.post('/phase-guidance', auth, async (req, res) => {
  try {
    const { phase, profileId } = req.body;

    if (!phase) {
      return res.status(400).json({ error: 'Phase requise' });
    }

    // Get child context
    let childContext = null;
    if (profileId) {
      const profile = await ChildProfile.findOne({
        _id: profileId,
        userId: req.user.id
      });

      if (profile) {
        childContext = {
          childName: profile.childName,
          age: profile.age,
          currentPhase: profile.currentPhase,
          phaseProgress: profile.phaseProgress[profile.currentPhase] || 0
        };
      }
    }

    const prompt = `L'enfant ${childContext ? childContext.childName : ''} est en Phase ${phase}. ${
      childContext ? `Âge: ${childContext.age}` : ''
    }. 

Donne-moi les 5 actions prioritaires pour cette phase avec des conseils pratiques et personnalisés. Sois concret et encourageant.`;

    const response = await chatWithBroolyAI(prompt, [], childContext);

    if (response.success) {
      res.json({
        guidance: response.message,
        phase,
        timestamp: new Date()
      });
    } else {
      res.status(500).json({ error: response.error });
    }
  } catch (error) {
    console.error('Phase guidance error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   POST /api/broolyai/suggest-activities
// @desc    Get activity suggestions
// @access  Private
router.post('/suggest-activities', auth, async (req, res) => {
  try {
    const { profileId, preferences } = req.body;

    if (!profileId) {
      return res.status(400).json({ error: 'Profile ID requis' });
    }

    const profile = await ChildProfile.findOne({
      _id: profileId,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    const childContext = {
      childName: profile.childName,
      age: profile.age,
      currentPhase: profile.currentPhase,
      phaseProgress: profile.phaseProgress[profile.currentPhase] || 0
    };

    const prompt = `Suggère 3 activités pratiques pour ${profile.childName} qui est en Phase ${profile.currentPhase} (${profile.age}). ${
      preferences ? `Préférences: ${preferences}` : ''
    }. 

Donne des activités concrètes, réalisables aujourd'hui, avec le matériel nécessaire et la durée estimée.`;

    const response = await chatWithBroolyAI(prompt, [], childContext);

    if (response.success) {
      res.json({
        activities: response.message,
        timestamp: new Date()
      });
    } else {
      res.status(500).json({ error: response.error });
    }
  } catch (error) {
    console.error('Activity suggestions error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

