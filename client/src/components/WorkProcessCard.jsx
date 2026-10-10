import React from 'react';

export default function WorkProcessCard({ processes = [] }) {
  const steps = processes.length > 0 ? processes : [
    {
      step: '01',
      title: 'DISCOVER',
      description: 'Understanding your goals, audience and requirements.'
    },
    {
      step: '02',
      title: 'DESIGN',
      description: 'Creating wireframes and visuals that communicate.'
    },
    {
      step: '03',
      title: 'DEVELOP',
      description: 'Building clean, responsive and scalable solutions.'
    },
    {
      step: '04',
      title: 'DELIVER',
      description: 'Testing, optimizing and launching with care.'
    }
  ];

  return (
    <div id="process" className="bg-[#12101c]/90 border border-purple-500/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left h-full">
      <div>
        <h3 className="font-syne font-black text-xl text-white uppercase tracking-wider mb-6 flex items-center justify-between">
          <span>WORK PROCESS</span>
          <span className="text-[10px] font-mono-code text-purple-400 font-normal px-2 py-0.5 rounded bg-purple-950/50 border border-purple-800/30">
            4 Agile Phases
          </span>
        </h3>

        {/* Vertical Timeline */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[1px] before:bg-gradient-to-b before:from-purple-500 before:via-purple-600/50 before:to-purple-900/20">
          {steps.map((proc, idx) => (
            <div key={idx} className="relative group text-left">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#181228] border-2 border-purple-500 flex items-center justify-center text-[9px] font-mono-code font-bold text-purple-200 shadow-sm shadow-purple-600/50 group-hover:scale-125 group-hover:bg-purple-600 group-hover:text-white transition-all">
                {proc.step}
              </div>

              {/* Step Title & Description */}
              <div className="pl-3">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-purple-300 group-hover:text-purple-100 transition-colors">
                  {proc.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed mt-1">
                  {proc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono-code text-gray-400">
        <span>Sprint Velocity</span>
        <span className="text-purple-400">100% On-Time Delivery</span>
      </div>
    </div>
  );
}
