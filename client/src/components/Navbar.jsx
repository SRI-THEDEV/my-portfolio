import React, { useState, useEffect } from 'react';
import { Menu, X, Database, Send, Lock, FileDown } from 'lucide-react';

export default function Navbar({ isAdmin, onOpenAdmin, onOpenAdminLogin, onOpenContact, dbStatus, resumeUrl }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resumeHref = resumeUrl || '/Sri_Nataraj_Resume.pdf';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#09080e]/85 backdrop-blur-md border-b border-purple-500/15 py-3 shadow-lg shadow-black/40' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 to-violet-500 flex items-center justify-center font-syne font-bold text-white shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
            SN
          </div>
          <div className="flex flex-col text-left">
            <span className="font-syne font-bold text-sm tracking-wider text-white group-hover:text-purple-300 transition-colors">
              SRI NATARAJ Y
            </span>
            <span className="text-[10px] font-mono-code text-purple-400/80 tracking-tight">
              &lt;/ FULL STACK DEVELOPER &gt;
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono-code tracking-wide">
          <a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors">
            // 01. SERVICES
          </a>
          <a href="#projects" className="text-gray-400 hover:text-purple-300 transition-colors">
            // 02. PROJECTS
          </a>
          <a href="#toolkit" className="text-gray-400 hover:text-purple-300 transition-colors">
            // 03. TOOLKIT
          </a>
          <a href="#process" className="text-gray-400 hover:text-purple-300 transition-colors">
            // 04. PROCESS
          </a>
          <a href="#contact" className="text-gray-400 hover:text-purple-300 transition-colors">
            // 05. CONTACT
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Resume Download CTA */}
          <a
            href={resumeHref}
            download="Sri_Nataraj_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            title="Download Sri Nataraj's Resume (PDF)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161224] hover:bg-[#201b34] border border-purple-500/30 hover:border-purple-400 text-xs font-mono-code text-purple-300 hover:text-white transition-all shadow-sm group"
          >
            <FileDown className="w-3.5 h-3.5 text-purple-400 group-hover:translate-y-0.5 transition-transform" />
            <span>RESUME</span>
          </a>

          {/* MERN Database Live Drawer Button - Visible ONLY if isAdmin */}
          {isAdmin ? (
            <button
              onClick={onOpenAdmin}
              title="Open MongoDB live management drawer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 hover:border-purple-400 text-xs font-mono-code text-purple-300 hover:text-white transition-all shadow-sm group animate-fade-in"
            >
              <Database className="w-3.5 h-3.5 text-purple-400 group-hover:animate-pulse" />
              <span className="hidden lg:inline">Admin Panel</span>
              <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              title="Admin Login (Ctrl+Shift+A)"
              className="p-1.5 rounded-full text-gray-500 hover:text-purple-300 hover:bg-[#171324] border border-transparent hover:border-purple-500/20 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Contact CTA */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium tracking-wide shadow-md shadow-purple-900/40 hover:shadow-purple-700/50 transition-all hover:scale-105 active:scale-95"
          >
            <span>GET IN TOUCH</span>
            <Send className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0c16]/95 border-b border-purple-500/20 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 text-sm font-mono-code">
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-purple-300"
          >
            // 01. SERVICES
          </a>
          <a 
            href="#projects" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-purple-300"
          >
            // 02. PROJECTS
          </a>
          <a 
            href="#toolkit" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-purple-300"
          >
            // 03. TOOLKIT
          </a>
          <a 
            href="#process" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-purple-300"
          >
            // 04. PROCESS
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-purple-300"
          >
            // 05. CONTACT
          </a>
          <div className="pt-2 flex flex-col gap-2 border-t border-purple-900/40">
            {isAdmin ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs"
              >
                <Database className="w-3.5 h-3.5" /> MongoDB Live Panel [Admin]
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminLogin(); }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#171324] border border-purple-500/20 text-gray-400 hover:text-purple-300 text-xs"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Login
              </button>
            )}
            <a
              href={resumeHref}
              download="Sri_Nataraj_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#161224] border border-purple-500/30 text-purple-200 hover:text-white text-xs font-mono-code transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-purple-400" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              className="py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
