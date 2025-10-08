const mongoose = require('mongoose');

const childProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  childName: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  age: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female', ''],
    default: ''
  },
  currentPhase: {
    type: String,
    enum: ['Alpha', 'Bêta', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'],
    required: true
  },
  phaseProgress: {
    Alpha: { type: Number, default: 0, min: 0, max: 100 },
    Bêta: { type: Number, default: 0, min: 0, max: 100 },
    Charlie: { type: Number, default: 0, min: 0, max: 100 },
    Delta: { type: Number, default: 0, min: 0, max: 100 },
    Echo: { type: Number, default: 0, min: 0, max: 100 },
    Foxtrot: { type: Number, default: 0, min: 0, max: 100 },
    Golf: { type: Number, default: 0, min: 0, max: 100 },
    Hotel: { type: Number, default: 0, min: 0, max: 100 }
  },
  activities: [{
    date: {
      type: Date,
      default: Date.now
    },
    phase: String,
    activity: {
      type: String,
      required: true
    },
    notes: String
  }],
  milestones: [{
    date: {
      type: Date,
      default: Date.now
    },
    milestone: {
      type: String,
      required: true
    },
    phase: String
  }],
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
childProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('ChildProfile', childProfileSchema);

