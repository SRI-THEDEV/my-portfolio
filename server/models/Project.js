import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    default: '01'
  },
  subtitle: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  mockupText: {
    heading: { type: String, default: 'Manage Projects Like a Pro' },
    subheading: { type: String, default: 'Intuitive modern workflow app' }
  },
  badgeColor: {
    type: String,
    default: '#9333ea'
  },
  tags: [{
    type: String
  }],
  previewGradient: {
    type: String,
    default: 'from-purple-900/40 via-violet-950/60 to-[#12101c]'
  },
  image: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: '#'
  },
  githubUrl: {
    type: String,
    default: '#'
  },
  featured: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
