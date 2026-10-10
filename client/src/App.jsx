import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import WhatIDoSection from './components/WhatIDoSection.jsx';
import FeaturedProjectsSection from './components/FeaturedProjectsSection.jsx';
import BottomGridSection from './components/BottomGridSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import AdminDrawer from './components/AdminDrawer.jsx';
import AdminLoginModal from './components/AdminLoginModal.jsx';

import {
  fetchProfile,
  fetchProjects,
  fetchServices,
  fetchToolkit,
  fetchProcesses,
  checkHealth,
  getAdminKey,
  setAdminKey,
  verifyAdminPasscode
} from './services/api.js';
import {
  fallbackProfile,
  fallbackProjects,
  fallbackServices,
  fallbackToolkit,
  fallbackProcesses
} from './data/fallbackData.js';

export default function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [services, setServices] = useState(fallbackServices);
  const [toolkit, setToolkit] = useState(fallbackToolkit);
  const [processes, setProcesses] = useState(fallbackProcesses);
  const [dbStatus, setDbStatus] = useState('checking');

  // UI States
  const [selectedProject, setSelectedProject] = useState(null);
  const [adminDrawerOpen, setAdminDrawerOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => Boolean(getAdminKey()));

  // Verify stored admin key on startup
  useEffect(() => {
    const key = getAdminKey();
    if (key) {
      verifyAdminPasscode(key)
        .then(() => setIsAdmin(true))
        .catch(() => {
          setAdminKey('');
          setIsAdmin(false);
        });
    }
  }, []);

  // Keyboard shortcut Ctrl+Shift+A for Admin toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) {
          setAdminDrawerOpen(prev => !prev);
        } else {
          setAdminLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  // Fetch initial data from Express + MongoDB backend
  useEffect(() => {
    const initData = async () => {
      try {
        const [profData, projsData, servsData, toolsData, procsData, health] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchServices(),
          fetchToolkit(),
          fetchProcesses(),
          checkHealth()
        ]);

        if (profData) setProfile(profData);
        if (projsData && projsData.length > 0) setProjects(projsData);
        if (servsData && servsData.length > 0) setServices(servsData);
        if (toolsData && toolsData.length > 0) setToolkit(toolsData);
        if (procsData && procsData.length > 0) setProcesses(procsData);
        if (health) setDbStatus(health.database);
      } catch (err) {
        console.warn('Backend connection notice:', err);
      }
    };

    initData();
  }, []);

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectCreated = (newProj) => {
    setProjects(prev => [...prev, newProj]);
  };

  const handleProjectDeleted = (id) => {
    setProjects(prev => prev.filter(p => p._id !== id));
    if (selectedProject?._id === id) setSelectedProject(null);
  };

  const handleLogout = () => {
    setAdminKey('');
    setIsAdmin(false);
    setAdminDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#09080e] text-[#dedce6] relative selection:bg-purple-600 selection:text-white">
      
      {/* Background Ambient Cosmic Nebulae */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-950/20 blur-[160px] rounded-full" />
        <div className="absolute top-[35%] right-0 w-[500px] h-[500px] bg-violet-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-purple-900/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Navigation Bar */}
        <Navbar
          isAdmin={isAdmin}
          dbStatus={dbStatus}
          resumeUrl={profile?.resumeUrl}
          onOpenAdmin={() => setAdminDrawerOpen(true)}
          onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onOpenContact={handleOpenContact}
        />

        {/* What I Do Section */}
        <WhatIDoSection
          services={services}
        />

        {/* Featured Projects Section */}
        <FeaturedProjectsSection
          projects={projects}
          isAdmin={isAdmin}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenAdmin={() => setAdminDrawerOpen(true)}
        />

        {/* Bottom Grid: Toolkit + Work Process + CTA Card */}
        <BottomGridSection
          toolkit={toolkit}
          processes={processes}
          onOpenContact={handleOpenContact}
        />

        {/* Contact & Connect Section */}
        <ContactSection
          profile={profile}
          isAdmin={isAdmin}
          onOpenAdmin={() => setAdminDrawerOpen(true)}
          onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
          onMessageSent={() => {
            // Can trigger a refresh or toast notification
          }}
        />
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Admin MongoDB Live Drawer */}
      <AdminDrawer
        isOpen={adminDrawerOpen}
        onClose={() => setAdminDrawerOpen(false)}
        projects={projects}
        profile={profile}
        onProfileUpdated={(updatedProfile) => setProfile(updatedProfile)}
        onProjectCreated={handleProjectCreated}
        onProjectDeleted={handleProjectDeleted}
        onLogout={handleLogout}
      />

      {/* Admin Passcode Authentication Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setAdminDrawerOpen(true);
        }}
      />

    </div>
  );
}
