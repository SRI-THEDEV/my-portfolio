import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, 'client/public');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const outputPath = path.join(targetDir, 'Sri_Nataraj_Resume.pdf');
const aliasPath = path.join(targetDir, 'resume.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: 'Sri Nataraj Y - Resume',
    Author: 'Sri Nataraj Y',
    Subject: 'Full Stack Developer Resume',
    Keywords: 'Full Stack Developer, React, Node.js, Python, MongoDB, Supabase'
  }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Color Palette
const PRIMARY = '#4c1d95'; // Deep Violet
const ACCENT = '#7c3aed';  // Purple Accent
const DARK = '#0f172a';    // Slate 900
const MUTED = '#475569';   // Slate 600
const LIGHT_BG = '#f8fafc'; // Slate 50
const BORDER = '#e2e8f0';

// Header Section
doc.rect(45, 38, 505, 88).fillAndStroke('#f5f3ff', '#ddd6fe');

doc.fillColor(PRIMARY)
   .font('Helvetica-Bold')
   .fontSize(22)
   .text('SRI NATARAJ Y', 60, 52);

doc.fillColor(ACCENT)
   .font('Helvetica-Bold')
   .fontSize(11)
   .text('FULL STACK DEVELOPER | CREATIVE WEB DEVELOPER', 60, 78);

doc.fillColor(MUTED)
   .font('Helvetica')
   .fontSize(8.5)
   .text('Thanjavur, Tamil Nadu   |   +91 7639989629   |   srinataraj39@gmail.com', 60, 96)
   .text('GitHub: github.com/SRI-THEDEV   |   LinkedIn: linkedin.com/in/sri-nataraj2006', 60, 108);

let currentY = 140;

// Section Helper
function drawSectionHeading(title, y) {
  doc.rect(45, y, 505, 20).fill('#f1f5f9');
  doc.fillColor(PRIMARY)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text(title.toUpperCase(), 55, y + 5);
  doc.rect(45, y, 3, 20).fill(ACCENT);
  return y + 26;
}

// Summary
currentY = drawSectionHeading('Professional Summary', currentY);
doc.fillColor(DARK)
   .font('Helvetica')
   .fontSize(9)
   .text(
     'Passionate and results-driven Computer Science graduate specializing in full-stack web application development with modern technologies including React, Node.js, Express, MongoDB, and Supabase. Proficient in crafting responsive, performant user interfaces and robust RESTful backends. Demonstrates quick adaptation to emerging frameworks and committed to building scalable digital solutions.',
     45,
     currentY,
     { width: 505, lineGap: 3 }
   );
currentY += 46;

// Technical Skills
currentY = drawSectionHeading('Technical Skills', currentY);
const skillGroups = [
  { label: 'Languages:', value: 'JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL' },
  { label: 'Frontend Development:', value: 'React.js, Next.js, Tailwind CSS, Responsive Design, State Management' },
  { label: 'Backend & Databases:', value: 'Node.js, Express.js, RESTful APIs, MongoDB, Supabase, PostgreSQL' },
  { label: 'Developer Tools & Platforms:', value: 'Git, GitHub, VS Code, Figma, Postman, Vercel, Vite' }
];

skillGroups.forEach(group => {
  doc.fillColor(DARK)
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(group.label, 50, currentY, { width: 140 });

  doc.font('Helvetica')
     .fillColor(MUTED)
     .text(group.value, 195, currentY, { width: 355 });

  currentY += 15;
});
currentY += 6;

// Featured Projects
currentY = drawSectionHeading('Featured Projects', currentY);

const projects = [
  {
    title: 'Brandix Studio — Digital Agency Web Application',
    tech: 'React, Tailwind CSS, Framer Motion, Node.js',
    points: [
      'Engineered an immersive agency website featuring a dark luxury purple aesthetic with smooth micro-interactions.',
      'Designed responsive UI components adhering to modern accessibility and performance standards.',
      'Integrated serverless API routes for live contact inquiries and project catalog management.'
    ]
  },
  {
    title: 'Taskly — Agile Project & Task Management Dashboard',
    tech: 'React, Express.js, MongoDB, Node.js, Chart.js',
    points: [
      'Developed a full-stack project dashboard supporting Kanban workflows, custom sprint stages, and activity tracking.',
      'Designed RESTful CRUD endpoints with Mongoose and schema validation for efficient task handling.',
      'Implemented dynamic analytics charts for sprint progress and team delivery tracking.'
    ]
  },
  {
    title: 'Hosteria — Next-Gen Serverless Cloud Hosting Platform',
    tech: 'Next.js, TypeScript, Tailwind CSS, Node.js',
    points: [
      'Built a high-converting web hosting landing page with instant domain search simulation and ping latency tools.',
      'Structured modular, reusable component hierarchy in TypeScript with high lighthouse audit performance.'
    ]
  }
];

projects.forEach(project => {
  doc.fillColor(DARK)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(project.title, 50, currentY);

  const titleWidth = doc.widthOfString(project.title);
  doc.fillColor(ACCENT)
     .font('Helvetica-Oblique')
     .fontSize(8)
     .text(`[ ${project.tech} ]`, 55 + titleWidth, currentY + 1.2);

  currentY += 13;

  project.points.forEach(point => {
    doc.fillColor(ACCENT)
       .fontSize(8)
       .text('•', 55, currentY);

    doc.fillColor(MUTED)
       .font('Helvetica')
       .fontSize(8.5)
       .text(point, 66, currentY, { width: 480, lineGap: 1.5 });

    currentY += 13;
  });

  currentY += 4;
});

// Education
currentY = drawSectionHeading('Education', currentY);

doc.fillColor(DARK)
   .font('Helvetica-Bold')
   .fontSize(9)
   .text('Bachelor of Science (B.Sc.) in Computer Science', 50, currentY);

doc.fillColor(MUTED)
   .font('Helvetica')
   .fontSize(8.5)
   .text('SRM Trichy Arts and Science College, Trichy (Affiliated with Bharathidasan University)', 50, currentY + 13);

currentY += 32;

// Soft Skills / Key Competencies
currentY = drawSectionHeading('Core Competencies & Strengths', currentY);

doc.fillColor(DARK)
   .font('Helvetica')
   .fontSize(8.5)
   .text(
     'Problem Solving • Clean Architecture • Responsive UI/UX • Version Control (Git) • Continuous Learning • Team Collaboration',
     50,
     currentY,
     { width: 500 }
   );

doc.end();

writeStream.on('finish', () => {
  fs.copyFileSync(outputPath, aliasPath);
  console.log(`Resume successfully generated at:`);
  console.log(` - ${outputPath}`);
  console.log(` - ${aliasPath}`);
});
