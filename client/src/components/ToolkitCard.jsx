import React from 'react';
import { 
  Code2, 
  Layers, 
  FileCode2, 
  Cpu, 
  Atom, 
  Boxes, 
  Wind, 
  Server, 
  GitBranch, 
  Terminal, 
  Database 
} from 'lucide-react';
import { FigmaIcon } from './Icons.jsx';

const techIcons = {
  html5: { label: '5', name: 'HTML5', icon: Code2 },
  css3: { label: '3', name: 'CSS3', icon: Layers },
  javascript: { label: 'JS', name: 'JavaScript', icon: FileCode2 },
  typescript: { label: 'TS', name: 'TypeScript', icon: Cpu },
  react: { label: '⚛', name: 'React', icon: Atom },
  nextjs: { label: 'N', name: 'Next.js', icon: Boxes },
  tailwind: { label: '≋', name: 'Tailwind CSS', icon: Wind },
  nodejs: { label: '⬢', name: 'Node.js', icon: Server },
  git: { label: '🐙', name: 'Git & GitHub', icon: GitBranch },
  figma: { label: '❖', name: 'Figma', icon: FigmaIcon },
  vscode: { label: '><', name: 'VS Code', icon: Terminal },
  mongodb: { label: '🍃', name: 'MongoDB', icon: Database }
};

export default function ToolkitCard({ toolkit = [] }) {
  // If database toolkit exists, map it; otherwise use full set of 12
  const tools = toolkit.length > 0 ? toolkit : [
    { name: 'HTML5', shortLabel: '5', iconKey: 'html5' },
    { name: 'CSS3', shortLabel: '3', iconKey: 'css3' },
    { name: 'JavaScript', shortLabel: 'JS', iconKey: 'javascript' },
    { name: 'TypeScript', shortLabel: 'TS', iconKey: 'typescript' },
    { name: 'React', shortLabel: '⚛', iconKey: 'react' },
    { name: 'Next.js', shortLabel: 'N', iconKey: 'nextjs' },
    { name: 'Tailwind CSS', shortLabel: '≋', iconKey: 'tailwind' },
    { name: 'Node.js', shortLabel: '⬢', iconKey: 'nodejs' },
    { name: 'Git & GitHub', shortLabel: '🐙', iconKey: 'git' },
    { name: 'Figma', shortLabel: '❖', iconKey: 'figma' },
    { name: 'VS Code', shortLabel: '><', iconKey: 'vscode' },
    { name: 'MongoDB', shortLabel: '🍃', iconKey: 'mongodb' }
  ];

  return (
    <div id="toolkit" className="bg-[#12101c]/90 border border-purple-500/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left h-full">
      <div>
        <h3 className="font-syne font-black text-xl text-white uppercase tracking-wider mb-6 flex items-center justify-between">
          <span>MY TOOLKIT</span>
          <span className="text-[10px] font-mono-code text-purple-400 font-normal px-2 py-0.5 rounded bg-purple-950/50 border border-purple-800/30">
            12+ Stacks
          </span>
        </h3>

        {/* 4x3 Grid of Tool Badges */}
        <div className="grid grid-cols-4 gap-3">
          {tools.map((item, idx) => {
            const iconData = techIcons[item.iconKey] || { label: item.shortLabel || '•', name: item.name };
            return (
              <div
                key={idx}
                title={item.name}
                className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#161224] hover:bg-purple-900/30 border border-purple-500/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Visual Icon Badge */}
                <div className="w-9 h-9 rounded-lg bg-black/40 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:text-purple-100 group-hover:border-purple-400 transition-colors">
                  <span className="font-mono-code font-bold text-xs">
                    {item.shortLabel || iconData.label}
                  </span>
                </div>
                {/* Tool Name */}
                <span className="text-[10px] font-mono-code text-gray-400 group-hover:text-purple-200 mt-2 text-center line-clamp-1">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono-code text-gray-400">
        <span>Production Ready</span>
        <span className="text-purple-400">TypeScript & Node Tested</span>
      </div>
    </div>
  );
}
