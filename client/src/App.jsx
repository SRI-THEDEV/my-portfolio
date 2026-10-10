import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import WhatIDoSection from './components/WhatIDoSection.jsx';
import FeaturedProjectsSection from './components/FeaturedProjectsSection.jsx';
import BottomGridSection from './components/BottomGridSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import AdminDrawer from './components/AdminDrawer.jsx';

import {
  fetchProfile,
  fetchProjects,
  fetchServices,
  fetchToolkit,
  fetchProcesses,
  checkHealth
} from './services/api.js';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [toolkit, setToolkit] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [dbStatus, setDbStatus] = useState('checking');

  // UI States
  const [selectedProject, setSelectedProject] = useState(null);
  const [adminDrawerOpen, setAdminDrawerOpen] = useState(false);

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
          dbStatus={dbStatus}
          onOpenAdmin={() => setAdminDrawerOpen(true)}
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
        onProjectCreated={handleProjectCreated}
        onProjectDeleted={handleProjectDeleted}
      />

    </div>
  );
}
