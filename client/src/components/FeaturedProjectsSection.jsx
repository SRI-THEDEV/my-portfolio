import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { GithubIcon } from './Icons.jsx';

export default function FeaturedProjectsSection({ projects = [], onSelectProject, onOpenAdmin, isAdmin }) {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'WEB DEV', 'DASHBOARD', 'LANDING PAGE'];

  const filteredProjects = projects.filter(proj => {
    if (filter === 'ALL') return true;
    if (filter === 'WEB DEV') return proj.category.toLowerCase().includes('web');
    if (filter === 'DASHBOARD') return proj.category.toLowerCase().includes('dashboard');
    if (filter === 'LANDING PAGE') return proj.category.toLowerCase().includes('landing');
    return true;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-mono-code text-purple-400 uppercase tracking-widest">
                Selected Works
              </span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              FEATURED PROJECTS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter tags */}
            <div className="flex items-center gap-1.5 p-1 bg-[#13101e] border border-purple-500/20 rounded-full text-xs font-mono-code">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    filter === cat
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-purple-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-xs font-mono-code text-purple-300 hover:text-white flex items-center gap-1 hover:underline ml-2"
              >
                <span>+ Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            return (
              <div
                key={project._id || index}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-[#12101c]/90 hover:bg-[#161224] border border-purple-500/15 hover:border-purple-400/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-950/40 flex flex-col text-left"
              >
                
                {/* Mockup Preview Area */}
                <div className={`relative h-56 p-5 bg-gradient-to-br ${project.previewGradient || 'from-purple-950/60 to-[#0e0c16]'} border-b border-purple-500/10 flex flex-col justify-between overflow-hidden`}>
                  
                  {/* Project Number badge */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono-code text-xs px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-purple-500/30 text-purple-200">
                      {project.number || `0${index + 1}`}
                    </span>
                    <span className="text-[11px] font-mono-code text-purple-300/80 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-700/30">
                      MERN Live
                    </span>
                  </div>

                  {/* Aesthetic Simulated UI Card Mockup */}
                  <div className="relative z-10 my-auto bg-black/40 backdrop-blur-md border border-purple-500/25 rounded-xl p-4 transition-transform duration-500 group-hover:scale-[1.02] shadow-xl">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                      <span className="w-2 h-2 rounded-full bg-green-400/80" />
                    </div>
                    <div className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-purple-200 transition-colors">
                      {project.subtitle || project.mockupText?.heading || project.title}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                      {project.mockupText?.subheading || project.category}
                    </div>
                  </div>

                  {/* Subtle Glow Orb inside Card */}
                  <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/35 transition-all" />
                </div>

                {/* Card Meta & Bottom Details */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-syne font-bold text-base text-white group-hover:text-purple-300 transition-colors uppercase tracking-wider">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono-code mt-1">
                      {project.category}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#1c182c] border border-purple-500/20 group-hover:border-purple-400 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:bg-purple-600 transition-all shadow-sm">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
