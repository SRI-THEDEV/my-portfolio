import React from 'react';
import { ArrowUpRight, Sparkles, Terminal, FileDown } from 'lucide-react';

export default function HeroSection({ profile, onOpenContact }) {
  const stats = profile?.stats || {
    experience: '1+',
    projectsDelivered: '15+',
    happyClients: '10+',
    technologies: '10+'
  };

  const resumeHref = profile?.resumeUrl || '/Sri_Nataraj_Y_Resume.pdf';

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-purple-700/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-violet-600/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Typography & Subtext */}
          <div className="lg:col-span-7 flex flex-col text-left z-10">
            
            {/* Tagline & Code Monogram */}
            <div className="space-y-1 mb-4">
              <p className="text-xs sm:text-sm font-mono-code text-purple-300 tracking-widest uppercase">
                {profile?.headline || 'I DESIGN & CODE DIGITAL EXPERIENCES THAT INSPIRE.'}
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono-code text-purple-400/80 bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-800/40 w-fit">
                <Terminal className="w-3 h-3 text-purple-400" />
                <span>{profile?.tagline || '</ CODE. DESIGN. DEPLOY />'}</span>
              </div>
            </div>

            {/* Title: CREATIVE DEVELOPER + Portfolio cursive */}
            <div className="relative mt-2 mb-8 select-none">
              <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.5rem] tracking-tight leading-[0.92] text-transparent bg-clip-text bg-gradient-to-b from-[#a78bfa] via-[#c084fc] to-[#e9d5ff] drop-shadow-sm uppercase">
                CREATIVE
              </h1>
              <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.5rem] tracking-tight leading-[0.92] text-white uppercase mt-1">
                DEVELOPER
              </h1>
              
              {/* Handwritten script 'Portfolio' positioned across DEVELOPER */}
              <span className="font-script absolute bottom-[-16px] sm:bottom-[-22px] left-[15%] sm:left-[24%] text-5xl sm:text-7xl md:text-8xl text-purple-400 drop-shadow-[0_4px_20px_rgba(168,85,247,0.85)] -rotate-6 pointer-events-none">
                Portfolio
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-2 mb-10">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all hover:scale-105 active:scale-95"
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#experience"
                className="px-5 py-3 rounded-full bg-[#13101e] hover:bg-[#1a1728] border border-purple-500/30 text-purple-200 text-sm font-medium transition-all hover:border-purple-400 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>EXPERIENCE</span>
              </a>
              <a
                href={resumeHref}
                download="Sri_Nataraj_Y_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 hover:border-purple-300 text-purple-200 hover:text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-900/40 hover:scale-105 active:scale-95 flex items-center gap-2 group backdrop-blur-sm"
                title="Download Resume (PDF)"
              >
                <FileDown className="w-4 h-4 text-purple-400 group-hover:translate-y-0.5 transition-transform" />
                <span>RESUME</span>
              </a>
              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-full bg-transparent hover:bg-purple-950/20 text-gray-400 hover:text-purple-200 text-sm font-medium transition-colors"
              >
                <span>LET'S TALK</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-purple-500/15">
              <div className="text-left">
                <div className="font-syne font-black text-2xl sm:text-3xl text-purple-300">
                  {stats.experience}
                </div>
                <div className="text-[10px] sm:text-xs font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                  YEARS EXPERIENCE
                </div>
              </div>
              <div className="text-left">
                <div className="font-syne font-black text-2xl sm:text-3xl text-purple-300">
                  {stats.projectsDelivered}
                </div>
                <div className="text-[10px] sm:text-xs font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                  PROJECTS DELIVERED
                </div>
              </div>
              <div className="text-left">
                <div className="font-syne font-black text-2xl sm:text-3xl text-purple-300">
                  {stats.happyClients}
                </div>
                <div className="text-[10px] sm:text-xs font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                  HAPPY CLIENTS
                </div>
              </div>
              <div className="text-left">
                <div className="font-syne font-black text-2xl sm:text-3xl text-purple-300">
                  {stats.technologies}
                </div>
                <div className="text-[10px] sm:text-xs font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                  TECHNOLOGIES
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Avatar, Circular Rotating Badge & Availability Status */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Availability Pill */}
            <div className="self-end lg:mr-6 mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161224] border border-purple-500/30 text-[11px] font-mono-code text-purple-200 tracking-wider shadow-sm z-20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Avatar & Cosmic Aura Container */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-[350px] md:h-[430px] rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-[#131020] to-[#0a0910] shadow-2xl shadow-purple-950/60 group">
              
              {/* Cosmic dust overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09080e] via-transparent to-transparent z-10 opacity-70" />
              <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/20 blur-3xl pointer-events-none rounded-full" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/15 blur-2xl pointer-events-none rounded-full" />
              
              {/* User Photo */}
              <img
                src="/user_photo.jpg"
                alt="Developer Portrait"
                className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105 filter brightness-105 contrast-105"
              />

              {/* Sparkle badge floating */}
              <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-[11px] font-mono-code text-purple-300 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                <span>MERN Fullstack</span>
              </div>
            </div>

            {/* Circular Rotating Monogram Badge (CD • CODE • DESIGN • DEPLOY) */}
            <div className="absolute -bottom-6 -right-2 sm:bottom-0 sm:right-2 z-20 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Rotating SVG Circular Text */}
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 120 120">
                  <path
                    id="circlePath"
                    d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-mono-code tracking-[3px] fill-purple-300 uppercase">
                    <textPath href="#circlePath" startOffset="0%">
                      • SRI NATARAJ Y • FULL STACK DEV • 
                    </textPath>
                  </text>
                </svg>

                {/* Center SN Badge */}
                <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-600 border border-purple-400/50 flex items-center justify-center font-syne font-black text-sm text-white shadow-lg shadow-purple-600/40">
                  SN
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
