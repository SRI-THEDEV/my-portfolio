import React from 'react';
import { X, ExternalLink, CheckCircle } from 'lucide-react';
import { GithubIcon } from './Icons.jsx';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#12101c] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60 max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header / Banner Preview */}
        <div className={`p-8 bg-gradient-to-br ${project.previewGradient || 'from-purple-900/60 to-[#0e0c16]'} border-b border-purple-500/15 relative overflow-hidden`}>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-purple-500/30 flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Number & Category */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-black/50 border border-purple-500/30 text-purple-200">
              {project.number}
            </span>
            <span className="text-xs font-mono-code text-purple-300">
              {project.category}
            </span>
          </div>

          <h2 className="font-syne font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            {project.title}
          </h2>
          <p className="font-syne text-sm sm:text-base text-purple-200/90 mt-1">
            {project.subtitle || project.mockupText?.heading}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">
              PROJECT OVERVIEW
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.description || 'Modern full-stack web application architected with high-performance components, reactive state management, and reliable backend integration.'}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">
              TECH STACK & ARCHITECTURE
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.tags || ['React', 'Node.js', 'MongoDB', 'Tailwind CSS']).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-[#181326] border border-purple-500/20 text-purple-300 text-xs font-mono-code"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">
              KEY HIGHLIGHTS
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Responsive, mobile-optimized design following modern UX principles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>REST API endpoints integrated with MongoDB and Mongoose</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Fluid micro-interactions and smooth performance optimization</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#0c0a14] border-t border-purple-500/15 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[11px] font-mono-code text-gray-400">
            Database Record ID: <span className="text-purple-400">{project._id || 'local-ref'}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171324] hover:bg-[#201a33] border border-purple-500/30 text-white text-xs font-mono-code transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-syne font-bold transition-all shadow-md shadow-purple-900/40"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
