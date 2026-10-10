import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'SRI NATARAJ Y'
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
    default: 'SN'
  },
  badgeText: {
    type: String,
    default: 'SRI NATARAJ Y • CODE • DEPLOY •'
  },
  phone: {
    type: String,
    default: '+91 7639989629'
  },
  location: {
    type: String,
    default: 'Thanjavur, Tamil Nadu'
  },
  summary: {
    type: String,
    default: 'Motivated Computer Science graduate with strong proficiency in Python, JavaScript, and database management. Experienced in full-stack web development through hands-on internships and project work.'
  },
  education: {
    type: String,
    default: 'B.Sc. Computer Science — SRM Trichy Arts and Science College, Trichy'
  },
  stats: {
    experience: { type: String, default: '1+' },
    projectsDelivered: { type: String, default: '15+' },
    happyClients: { type: String, default: '10+' },
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
    github: { type: String, default: 'https://github.com/SRI-THEDEV' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/sri-nataraj2006' },
    twitter: { type: String, default: 'https://twitter.com' },
    email: { type: String, default: 'srinataraj39@gmail.com' },
    phone: { type: String, default: '+91 7639989629' },
    location: { type: String, default: 'Thanjavur, Tamil Nadu' }
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
