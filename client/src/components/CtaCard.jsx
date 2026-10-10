import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function CtaCard({ onOpenContact }) {
  return (
    <div className="relative rounded-2xl p-7 sm:p-8 bg-gradient-to-br from-[#9333ea] via-[#8b5cf6] to-[#7c3aed] text-white flex flex-col justify-between text-left overflow-hidden shadow-2xl shadow-purple-900/40 group h-full">
      
      {/* Decorative radial background accents */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-purple-900/30 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Title with glowing star */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-syne font-black text-2xl sm:text-3xl leading-tight tracking-tight uppercase max-w-xs">
            LET'S BUILD SOMETHING AMAZING TOGETHER.
          </h3>
          <Sparkles className="w-6 h-6 text-purple-200 fill-white flex-shrink-0 animate-pulse mt-1" />
        </div>

        {/* Subtitle */}
        <p className="text-purple-100 text-xs sm:text-sm font-light leading-relaxed max-w-xs">
          I'm open to new opportunities and exciting collaborations.
        </p>
      </div>

      {/* Dark Pill CTA Button */}
      <div className="mt-8">
        <button
          onClick={onOpenContact}
          className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-4 px-6 py-3.5 rounded-full bg-[#120f1e] hover:bg-[#1a162b] text-white font-syne font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-xl shadow-black/40"
        >
          <span>GET IN TOUCH</span>
          <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center text-white">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

    </div>
  );
}
