import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  Languages, 
  Calendar, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  ChevronRight,
  Code2,
  BrainCircuit,
  Database,
  FileSpreadsheet,
  MessageSquare
} from 'lucide-react';

const certIcons = {
  'MongoDB Database Certification': Database,
  'Artificial Intelligence Foundations': BrainCircuit,
  'MS Excel Professional': FileSpreadsheet,
  'Communication Skills': MessageSquare
};

export default function ExperienceSection({ profile }) {
  const [activeTab, setActiveTab] = useState('experience');

  const experienceList = profile?.experience || [
    {
      role: 'Web Development Intern',
      company: 'The Arrowai',
      type: 'Remote',
      period: 'May 2025 – June 2025',
      grade: 'Grade "A" Performance',
      points: [
        'Engineered responsive web interfaces using HTML5, CSS3, and JavaScript for seamless cross-browser consistency.',
        'Developed Python-based backend REST API endpoints to streamline data workflows and feature integration.',
        'Collaborated in an Agile team, earning an "A" performance grade for code quality, debugging, and timely delivery.'
      ],
      skills: ['Python', 'REST APIs', 'JavaScript', 'HTML5', 'CSS3', 'Agile']
    }
  ];

  const educationList = profile?.educationList || [
    {
      degree: 'B.Sc. Computer Science',
      institution: 'SRM Trichy Arts and Science College, Trichy',
      score: 'CGPA: 6.6/10',
      period: 'College Degree',
      badge: 'Undergraduate'
    },
    {
      degree: 'HSC (Class XII)',
      institution: 'Kamala Subramaniam Higher Secondary School',
      score: '68%',
      period: '2024',
      badge: 'Higher Secondary'
    },
    {
      degree: 'SSLC (Class X)',
      institution: 'Maxwell Higher Secondary School',
      score: '58%',
      period: '2022',
      badge: 'Secondary School'
    }
  ];

  const certifications = profile?.certifications || [
    { title: 'MongoDB Database Certification', issuer: 'MongoDB', tag: 'Database' },
    { title: 'Artificial Intelligence Foundations', issuer: 'IBM', tag: 'AI & Data' },
    { title: 'MS Excel Professional', issuer: 'Simplilearn', tag: 'Productivity' },
    { title: 'Communication Skills', issuer: 'Skill India', tag: 'Professional' }
  ];

  const leadership = profile?.leadership || [
    {
      role: 'President',
      org: 'Code Warriors Club',
      desc: 'Spearheaded technical initiatives, organized intercollegiate coding competitions, and led programming workshops.'
    },
    {
      role: 'Academic & Event Coordinator',
      org: 'Technical Events & Hackathons',
      desc: 'Organized hackathons, technical seminars, and campus wellness events to foster student engagement.'
    }
  ];

  const languages = profile?.spokenLanguages || ['English', 'Tamil', 'Japanese'];
  const softSkills = profile?.softSkills || ['Problem Solving', 'Critical Thinking', 'Team Collaboration', 'Communication', 'Adaptability'];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-indigo-900/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-purple-400 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-800/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAREER TRACK & CREDENTIALS</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              EXPERIENCE & BACKGROUND
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-2">
              From real-world software internships to leadership roles and verified certifications, here is the journey behind the code.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-10 p-1.5 rounded-2xl bg-[#12101c] border border-purple-500/20 w-fit">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-xl font-mono-code text-xs font-medium flex items-center gap-2 transition-all ${
              activeTab === 'experience'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-purple-300 hover:bg-purple-950/30'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>INTERNSHIP</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2.5 rounded-xl font-mono-code text-xs font-medium flex items-center gap-2 transition-all ${
              activeTab === 'education'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-purple-300 hover:bg-purple-950/30'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>EDUCATION</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-5 py-2.5 rounded-xl font-mono-code text-xs font-medium flex items-center gap-2 transition-all ${
              activeTab === 'certifications'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-purple-300 hover:bg-purple-950/30'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>CERTIFICATIONS</span>
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-5 py-2.5 rounded-xl font-mono-code text-xs font-medium flex items-center gap-2 transition-all ${
              activeTab === 'leadership'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-purple-300 hover:bg-purple-950/30'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>LEADERSHIP & SKILLS</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Card View */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. INTERNSHIP TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6 animate-fade-in text-left">
                {experienceList.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#12101c]/90 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/40 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-bl-full pointer-events-none" />

                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-syne font-bold text-2xl text-white">
                            {exp.role}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-purple-300 font-mono-code">
                          <span className="font-semibold text-purple-200">{exp.company}</span>
                          <span>•</span>
                          <span className="text-gray-400">{exp.type}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono-code text-purple-300">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </span>
                        {exp.grade && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-[11px] font-mono-code text-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{exp.grade}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Key Contributions */}
                    <div className="space-y-3 my-6">
                      {exp.points?.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {pt}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-4 border-t border-purple-500/15 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono-code text-gray-400 mr-2">Technologies:</span>
                      {exp.skills?.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-[#181326] border border-purple-500/20 text-xs font-mono-code text-purple-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-4 animate-fade-in text-left">
                {educationList.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-[#12101c]/90 border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-syne font-bold text-lg text-white">
                            {edu.degree}
                          </h4>
                          {edu.badge && (
                            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-purple-950/70 border border-purple-700/40 text-purple-300">
                              {edu.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-500/10">
                      <div className="font-mono-code font-bold text-base text-purple-300">
                        {edu.score}
                      </div>
                      <div className="text-[11px] font-mono-code text-gray-500 mt-0.5">
                        {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. CERTIFICATIONS TAB */}
            {activeTab === 'certifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in text-left">
                {certifications.map((cert, idx) => {
                  const Icon = certIcons[cert.title] || Award;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#12101c]/90 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:border-purple-400 transition-all shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-code text-purple-400 uppercase tracking-wider block mb-1">
                          {cert.tag}
                        </span>
                        <h4 className="font-syne font-bold text-base text-white group-hover:text-purple-200 transition-colors">
                          {cert.title}
                        </h4>
                        <p className="text-xs font-mono-code text-gray-400 mt-1">
                          Provider: <span className="text-purple-300">{cert.issuer}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. LEADERSHIP & SKILLS TAB */}
            {activeTab === 'leadership' && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="space-y-4">
                  {leadership.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#12101c]/90 border border-purple-500/20 hover:border-purple-400/40 transition-all flex items-start gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                        <Trophy className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-syne font-bold text-base text-white">
                            {item.role}
                          </h4>
                          <span className="text-xs font-mono-code text-purple-300">
                            — {item.org}
                          </span>
                        </div>
                        <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Soft Skills Showcase */}
                <div className="p-6 rounded-2xl bg-[#12101c]/80 border border-purple-500/15">
                  <h4 className="font-syne font-bold text-sm text-white uppercase tracking-wider mb-3">
                    Core Soft Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono-code text-purple-200"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Profile Snapshot & Resume Card */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Quick Profile Summary Card */}
            <div className="p-7 rounded-3xl bg-[#131020] border border-purple-500/20 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center font-syne font-bold text-white shadow-md">
                  SN
                </div>
                <div>
                  <h4 className="font-syne font-bold text-base text-white">
                    {profile?.name || 'SRI NATARAJ Y'}
                  </h4>
                  <p className="text-[11px] font-mono-code text-purple-400">
                    Software Engineering Aspirant
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
                "{profile?.summary || 'Motivated Computer Science graduate proficient in Python, JavaScript, and database management. Experienced in full-stack web development through internships and hands-on projects.'}"
              </p>

              {/* Languages Spoken */}
              <div className="pt-4 border-t border-purple-500/15">
                <div className="flex items-center gap-2 text-xs font-mono-code text-gray-400 mb-2.5">
                  <Languages className="w-3.5 h-3.5 text-purple-400" />
                  <span>Languages Known:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      className="px-2.5 py-1 rounded-md bg-black/40 border border-purple-500/20 text-xs font-mono-code text-purple-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Credentials Summary Card */}
            <div className="p-7 rounded-3xl bg-[#131020] border border-purple-500/20 text-left relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h4 className="font-syne font-bold text-base text-white">
                  Career Highlights
                </h4>
              </div>

              <div className="space-y-3.5 text-xs font-mono-code">
                <div className="flex items-start gap-2.5 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">Web Dev Intern</span>
                    <span className="text-gray-400 block text-[11px]">The Arrowai (Remote • Grade A)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">B.Sc. Computer Science</span>
                    <span className="text-gray-400 block text-[11px]">SRM Trichy (CGPA: 6.6/10)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">MongoDB & IBM AI Certified</span>
                    <span className="text-gray-400 block text-[11px]">4 Professional Certifications</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">Club President</span>
                    <span className="text-gray-400 block text-[11px]">Code Warriors & Hackathon Lead</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
