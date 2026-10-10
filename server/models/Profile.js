import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Creative Developer'
  },
  role: {
    type: String,
    default: 'CREATIVE DEVELOPER'
  },
  headline: {
    type: String,
    default: 'I DESIGN & CODE DIGITAL EXPERIENCES THAT INSPIRE.'
  },
  tagline: {
    type: String,
    default: '</ CODE. DESIGN. DEPLOY />'
  },
  availableForProjects: {
    type: Boolean,
    default: true
  },
  badgeInitials: {
    type: String,
    default: 'CD'
  },
  badgeText: {
    type: String,
    default: 'CREATIVE DEVELOPER • CODE • DEPLOY •'
  },
  stats: {
    experience: { type: String, default: '4+' },
    projectsDelivered: { type: String, default: '40+' },
    happyClients: { type: String, default: '25+' },
    technologies: { type: String, default: '10+' }
  },
  whatIDoDescription: {
    type: String,
    default: 'I design, build and ship modern websites and web applications that are fast, responsive and user-focused.'
  },
  ctaText: {
    title: { type: String, default: "LET'S BUILD SOMETHING AMAZING TOGETHER." },
    description: { type: String, default: "I'm open to new opportunities and exciting collaborations." }
  },
  socials: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    email: { type: String, default: 'developer@example.com' }
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
