import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Toolkit from '../models/Toolkit.js';
import Process from '../models/Process.js';
import Profile from '../models/Profile.js';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eportfolio_db';

export const initialProjects = [
  {
    number: '01',
    title: 'BRANDIX STUDIO',
    subtitle: 'Elevate Your Brand',
    category: 'Web Design & Development',
    description: 'A cutting-edge agency website featuring a dark luxury purple aesthetic, smooth micro-interactions, responsive typography, and high-performance serverless endpoints.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    mockupText: {
      heading: 'Elevate Your Brand',
      subheading: 'Digital experiences engineered for ambitious brands'
    },
    badgeColor: '#a855f7',
    previewGradient: 'from-purple-900/50 via-[#18122B] to-[#0d0b14]',
    liveUrl: 'https://brandix-studio-preview.vercel.app',
    githubUrl: 'https://github.com/developer/brandix-studio',
    featured: true,
    order: 1
  },
  {
    number: '02',
    title: 'TASKLY APP',
    subtitle: 'Manage Projects Like a Pro',
    category: 'Dashboard Design & Development',
    description: 'A cloud-based project management dashboard equipped with interactive Kanban boards, automated workflow triggers, sprint tracking, and team productivity analytics.',
    tags: ['React', 'Express', 'MongoDB', 'Chart.js'],
    mockupText: {
      heading: 'Manage Projects Like a Pro',
      subheading: 'Agile sprints, custom stages & instant activity feeds'
    },
    badgeColor: '#8b5cf6',
    previewGradient: 'from-violet-950/60 via-[#1d1533] to-[#0d0b14]',
    liveUrl: 'https://taskly-app-demo.vercel.app',
    githubUrl: 'https://github.com/developer/taskly-app',
    featured: true,
    order: 2
  },
  {
    number: '03',
    title: 'HOSTERIA',
    subtitle: 'Ultra Fast Web Hosting',
    category: 'Landing Page Design & Development',
    description: 'A high-converting SaaS landing page for next-gen serverless hosting, featuring instant domain search lookup, live ping latency monitors, and pricing calculators.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    mockupText: {
      heading: 'Ultra Fast Web Hosting',
      subheading: 'Deploy globally with sub-millisecond edge latency'
    },
    badgeColor: '#7c3aed',
    previewGradient: 'from-indigo-950/60 via-[#19142b] to-[#0d0b14]',
    liveUrl: 'https://hosteria-cloud-demo.vercel.app',
    githubUrl: 'https://github.com/developer/hosteria-cloud',
    featured: true,
    order: 3
  }
];

export const initialServices = [
  {
    number: '01',
    title: 'WEB DESIGN',
    description: 'Pixel-perfect designs that combine creativity with strategy.',
    icon: 'Compass',
    order: 1
  },
  {
    number: '02',
    title: 'WEB DEVELOPMENT',
    description: 'Clean, scalable code with modern frameworks and best practices.',
    icon: 'Code',
    order: 2
  },
  {
    number: '03',
    title: 'UI/UX DESIGN',
    description: 'Intuitive interfaces designed for seamless user experiences.',
    icon: 'Layers',
    order: 3
  },
  {
    number: '04',
    title: 'OPTIMIZATION',
    description: 'Speed, SEO and performance tweaks that drive results.',
    icon: 'Zap',
    order: 4
  }
];

export const initialToolkit = [
  { name: 'HTML5', shortLabel: '5', category: 'frontend', iconKey: 'html5', level: 'Expert', order: 1 },
  { name: 'CSS3', shortLabel: '3', category: 'frontend', iconKey: 'css3', level: 'Expert', order: 2 },
  { name: 'JavaScript', shortLabel: 'JS', category: 'frontend', iconKey: 'javascript', level: 'Expert', order: 3 },
  { name: 'TypeScript', shortLabel: 'TS', category: 'frontend', iconKey: 'typescript', level: 'Advanced', order: 4 },
  { name: 'React', shortLabel: '⚛', category: 'frontend', iconKey: 'react', level: 'Expert', order: 5 },
  { name: 'Next.js', shortLabel: 'N', category: 'frontend', iconKey: 'nextjs', level: 'Advanced', order: 6 },
  { name: 'Tailwind CSS', shortLabel: '≋', category: 'frontend', iconKey: 'tailwind', level: 'Expert', order: 7 },
  { name: 'Node.js', shortLabel: '⬢', category: 'backend', iconKey: 'nodejs', level: 'Expert', order: 8 },
  { name: 'Git & GitHub', shortLabel: '🐙', category: 'tools', iconKey: 'git', level: 'Advanced', order: 9 },
  { name: 'Figma', shortLabel: '❖', category: 'design', iconKey: 'figma', level: 'Advanced', order: 10 },
  { name: 'VS Code', shortLabel: '><', category: 'tools', iconKey: 'vscode', level: 'Expert', order: 11 },
  { name: 'MongoDB', shortLabel: '🍃', category: 'database', iconKey: 'mongodb', level: 'Advanced', order: 12 }
];

export const initialProcesses = [
  {
    step: '01',
    title: 'DISCOVER',
    description: 'Understanding your goals, audience and requirements.',
    order: 1
  },
  {
    step: '02',
    title: 'DESIGN',
    description: 'Creating wireframes and visuals that communicate.',
    order: 2
  },
  {
    step: '03',
    title: 'DEVELOP',
    description: 'Building clean, responsive and scalable solutions.',
    order: 3
  },
  {
    step: '04',
    title: 'DELIVER',
    description: 'Testing, optimizing and launching with care.',
    order: 4
  }
];

export const initialProfile = {
  name: 'Creative Developer',
  role: 'CREATIVE DEVELOPER',
  headline: 'I DESIGN & CODE DIGITAL EXPERIENCES THAT INSPIRE.',
  tagline: '</ CODE. DESIGN. DEPLOY />',
  availableForProjects: true,
  badgeInitials: 'CD',
  badgeText: 'CREATIVE DEVELOPER • CODE • DEPLOY •',
  stats: {
    experience: '4+',
    projectsDelivered: '40+',
    happyClients: '25+',
    technologies: '10+'
  },
  whatIDoDescription: 'I design, build and ship modern websites and web applications that are fast, responsive and user-focused.',
  ctaText: {
    title: "LET'S BUILD SOMETHING AMAZING TOGETHER.",
    description: "I'm open to new opportunities and exciting collaborations."
  },
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'hello@creativedeveloper.dev'
  }
};

export async function seedDatabase() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log('✓ Projects seeded into MongoDB');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(initialServices);
      console.log('✓ Services seeded into MongoDB');
    }

    const toolkitCount = await Toolkit.countDocuments();
    if (toolkitCount === 0) {
      await Toolkit.insertMany(initialToolkit);
      console.log('✓ Toolkit seeded into MongoDB');
    }

    const processCount = await Process.countDocuments();
    if (processCount === 0) {
      await Process.insertMany(initialProcesses);
      console.log('✓ Work processes seeded into MongoDB');
    }

    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create(initialProfile);
      console.log('✓ Profile seeded into MongoDB');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}

// Standalone seed runner if executed directly
if (process.argv[1]?.endsWith('seedData.js')) {
  mongoose.connect(mongoUri)
    .then(async () => {
      console.log('Connected to MongoDB. Wiping existing data & re-seeding...');
      await Project.deleteMany({});
      await Service.deleteMany({});
      await Toolkit.deleteMany({});
      await Process.deleteMany({});
      await Profile.deleteMany({});
      await seedDatabase();
      console.log('Database successfully seeded!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}
