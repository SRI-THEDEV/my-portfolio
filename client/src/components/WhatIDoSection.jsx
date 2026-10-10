import React from 'react';
import { Compass, Code, Layers, Zap, Sparkles } from 'lucide-react';

const iconMap = {
  Compass: Compass,
  Code: Code,
  Layers: Layers,
  Zap: Zap
};

export default function WhatIDoSection({ services = [] }) {
  // Fallback default services if database is syncing
  const displayServices = services.length > 0 ? services : [
    {
      number: '01',
      title: 'WEB DESIGN',
      description: 'Pixel-perfect designs that combine creativity with strategy.',
      icon: 'Compass'
    },
    {
      number: '02',
      title: 'WEB DEVELOPMENT',
      description: 'Clean, scalable code with modern frameworks and best practices.',
      icon: 'Code'
    },
    {
      number: '03',
      title: 'UI/UX DESIGN',
      description: 'Intuitive interfaces designed for seamless user experiences.',
      icon: 'Layers'
    },
    {
      number: '04',
      title: 'OPTIMIZATION',
      description: 'Speed, SEO and performance tweaks that drive results.',
      icon: 'Zap'
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 text-left">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-syne font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                WHAT I DO
              </h2>
              <Sparkles className="w-5 h-5 text-purple-400 fill-purple-400 animate-pulse" />
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
              I design, build and ship modern websites and web applications that are fast, responsive and user-focused.
            </p>
          </div>
          
          <div className="lg:col-span-7 flex justify-start lg:justify-end">
            <div className="text-xs font-mono-code text-purple-400/80 bg-purple-950/30 px-3 py-1.5 rounded-full border border-purple-800/30">
              // END-TO-END FULL STACK CAPABILITIES
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={service._id || index}
                className="group relative bg-[#13101c]/80 hover:bg-[#181324] border border-purple-500/15 hover:border-purple-400/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-900/20 flex flex-col justify-between text-left"
              >
                {/* Subtle Card Glow Effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-bl-full pointer-events-none group-hover:bg-purple-600/15 transition-all" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-600/30 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 group-hover:border-purple-400 group-hover:text-purple-200 transition-all">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-syne font-bold text-lg text-white group-hover:text-purple-200 transition-colors mb-3 tracking-wide">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Step Number */}
                <div className="font-mono-code text-xs text-purple-400/60 font-semibold pt-4 border-t border-purple-500/10 group-hover:text-purple-300 transition-colors">
                  {service.number || `0${index + 1}`}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
