const express = require('express');
const router = express.Router();
const ChildProfile = require('../models/ChildProfile');
const auth = require('../middleware/auth');

// Helper function to calculate age
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();

  if (years > 0) return `${years} an${years > 1 ? 's' : ''}`;
  if (months > 0) return `${months} mois`;
  return `${Math.max(0, days)} jour${days > 1 ? 's' : ''}`;
}

// @route   GET /api/profiles
// @desc    Get all profiles for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await ChildProfile.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    console.error('Get profiles error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   GET /api/profiles/:id
// @desc    Get single profile
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await ChildProfile.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   POST /api/profiles
// @desc    Create child profile
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { childName, birthDate, currentPhase, gender, notes } = req.body;

    // Validation
    if (!childName || !birthDate || !currentPhase) {
      return res.status(400).json({ 
        error: 'Nom, date de naissance et phase requises' 
      });
    }

    // Calculate age
    const age = calculateAge(new Date(birthDate));

    const profile = new ChildProfile({
      userId: req.user.id,
      childName,
      birthDate: new Date(birthDate),
      currentPhase,
      gender: gender || '',
      notes: notes || '',
      age
    });

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Create profile error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   PUT /api/profiles/:id
// @desc    Update profile
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const profile = await ChildProfile.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    // Update fields
    const { childName, birthDate, currentPhase, gender, notes } = req.body;
    
    if (childName) profile.childName = childName;
    if (birthDate) {
      profile.birthDate = new Date(birthDate);
      profile.age = calculateAge(new Date(birthDate));
    }
    if (currentPhase) profile.currentPhase = currentPhase;
    if (gender !== undefined) profile.gender = gender;
    if (notes !== undefined) profile.notes = notes;

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   PUT /api/profiles/:id/progress
// @desc    Update phase progress
// @access  Private
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const { phase, progress } = req.body;

    if (!phase || progress === undefined) {
      return res.status(400).json({ error: 'Phase et progression requises' });
    }

    const profile = await ChildProfile.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    // Update progress (ensure it's between 0-100)
    profile.phaseProgress[phase] = Math.min(100, Math.max(0, progress));
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error('Update progress error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   POST /api/profiles/:id/activity
// @desc    Add activity
// @access  Private
router.post('/:id/activity', auth, async (req, res) => {
  try {
    const { activity, notes, phase } = req.body;

    if (!activity) {
      return res.status(400).json({ error: 'Activité requise' });
    }

    const profile = await ChildProfile.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    profile.activities.push({
      date: new Date(),
      phase: phase || profile.currentPhase,
      activity,
      notes: notes || ''
    });

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Add activity error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   POST /api/profiles/:id/milestone
// @desc    Add milestone
// @access  Private
router.post('/:id/milestone', auth, async (req, res) => {
  try {
    const { milestone, phase } = req.body;

    if (!milestone) {
      return res.status(400).json({ error: 'Milestone requis' });
    }

    const profile = await ChildProfile.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    profile.milestones.push({
      date: new Date(),
      milestone,
      phase: phase || profile.currentPhase
    });

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Add milestone error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// @route   DELETE /api/profiles/:id
// @desc    Delete profile
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await ChildProfile.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }

    res.json({ message: 'Profil supprimé avec succès' });
  } catch (err) {
    console.error('Delete profile error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

