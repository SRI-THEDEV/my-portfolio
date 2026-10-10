import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Mail, 
  Plus, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  FolderGit2, 
  LogOut,
  BarChart2,
  Sparkles,
  Save,
  Loader2,
  FileDown
} from 'lucide-react';
import { 
  fetchMessages, 
  deleteMessage, 
  createProject, 
  deleteProject, 
  checkHealth,
  fetchProfile,
  updateProfile
} from '../services/api.js';

export default function AdminDrawer({ 
  isOpen, 
  onClose, 
  projects, 
  profile, 
  onProfileUpdated, 
  onProjectCreated, 
  onProjectDeleted, 
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('stats');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverHealth, setServerHealth] = useState(null);

  // Hero Section Stats State
  const [statsForm, setStatsForm] = useState({
    experience: profile?.stats?.experience || '1+',
    projectsDelivered: profile?.stats?.projectsDelivered || '15+',
    happyClients: profile?.stats?.happyClients || '10+',
    technologies: profile?.stats?.technologies || '10+'
  });
  const [resumeUrlInput, setResumeUrlInput] = useState(profile?.resumeUrl || '/Sri_Nataraj_Y_Resume.pdf');
  const [statsSaving, setStatsSaving] = useState(false);

  // Sync stats when profile prop updates
  useEffect(() => {
    if (profile?.stats) {
      setStatsForm({
        experience: profile.stats.experience || '1+',
        projectsDelivered: profile.stats.projectsDelivered || '15+',
        happyClients: profile.stats.happyClients || '10+',
        technologies: profile.stats.technologies || '10+'
      });
    }
    if (profile?.resumeUrl) {
      setResumeUrlInput(profile.resumeUrl);
    }
  }, [profile]);

  // New project state
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    category: 'Web Design & Development',
    description: '',
    tags: 'React, Node.js, MongoDB',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  });
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [msgs, health, prof] = await Promise.all([
        fetchMessages().catch(() => []),
        checkHealth().catch(() => null),
        fetchProfile().catch(() => null)
      ]);
      setMessages(msgs);
      setServerHealth(health);
      if (prof?.stats) {
        setStatsForm({
          experience: prof.stats.experience || '1+',
          projectsDelivered: prof.stats.projectsDelivered || '15+',
          happyClients: prof.stats.happyClients || '10+',
          technologies: prof.stats.technologies || '10+'
        });
      }
      if (prof?.resumeUrl) {
        setResumeUrlInput(prof.resumeUrl);
      }
      if (prof && onProfileUpdated) {
        onProfileUpdated(prof);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    try {
      setStatsSaving(true);
      const res = await updateProfile({ stats: statsForm, resumeUrl: resumeUrlInput });
      if (res?.data && onProfileUpdated) {
        onProfileUpdated(res.data);
      }
      setActionNotice('Profile stats & resume link saved to database!');
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    } finally {
      setStatsSaving(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      setActionNotice('Message removed from MongoDB');
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project from MongoDB?')) return;
    try {
      await deleteProject(id);
      if (onProjectDeleted) onProjectDeleted(id);
      setActionNotice('Project deleted from MongoDB');
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.category) return;

    try {
      setProjectSubmitting(true);
      const payload = {
        ...newProject,
        number: `0${(projects?.length || 0) + 1}`,
        tags: newProject.tags.split(',').map(t => t.trim()),
        previewGradient: 'from-purple-900/50 via-[#18122B] to-[#0d0b14]'
      };
      const result = await createProject(payload);
      if (onProjectCreated) onProjectCreated(result.data);
      setNewProject({
        title: '',
        subtitle: '',
        category: 'Web Design & Development',
        description: '',
        tags: 'React, Node.js, MongoDB',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
      });
      setActionNotice('New project added to MongoDB!');
      setTimeout(() => setActionNotice(null), 3000);
      setActiveTab('projects');
    } catch (err) {
      alert('Error creating project: ' + err.message);
    } finally {
      setProjectSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#0f0d18] border-l border-purple-500/25 h-full flex flex-col shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-purple-500/15 flex items-center justify-between bg-[#141021]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg text-white">
                MongoDB Live Panel
              </h3>
              <p className="text-[11px] font-mono-code text-purple-300/80">
                MERN Backend Control & Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="Refresh MongoDB Data"
              className="p-2 rounded-lg bg-[#19152b] hover:bg-[#231e3d] text-purple-300 border border-purple-500/20"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                title="Log out of Admin Mode"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-mono-code transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#19152b] hover:bg-[#231e3d] text-gray-400 hover:text-white border border-purple-500/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Database Health Pill */}
        <div className="px-6 py-3 bg-[#110e1b] border-b border-purple-500/10 flex items-center justify-between text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300">Status:</span>
            <span className="text-emerald-400 font-semibold">
              {serverHealth?.database === 'connected' ? 'Connected (Port 27017)' : 'Checking...'}
            </span>
          </div>
          <div className="text-purple-400 text-[11px]">
            DB: eportfolio_db
          </div>
        </div>

        {/* Action notification */}
        {actionNotice && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-purple-950/80 border border-purple-500/50 text-xs font-mono-code text-purple-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-purple-500/10 flex gap-4 text-xs font-mono-code overflow-x-auto">
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <span>Stats & Resume</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({projects?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'add'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Project</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB: HERO STATS */}
          {activeTab === 'stats' && (
            <form onSubmit={handleSaveStats} className="space-y-5">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-left">
                <div className="flex items-center gap-2 text-purple-300 font-syne font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Hero Counter Metrics</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Update the live statistics displayed directly on your Hero Section. Changes are saved directly into MongoDB and immediately update the live website.
                </p>
              </div>

              {/* Live Preview Cards Grid */}
              <div className="text-left">
                <label className="block text-[11px] font-mono-code uppercase text-gray-400 mb-2 tracking-wider">
                  Live Preview on Hero Section
                </label>
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#0a0812] border border-purple-500/20">
                  <div className="p-2.5 rounded-lg bg-[#141022] border border-purple-500/10 text-left">
                    <div className="font-syne font-black text-xl text-purple-300">
                      {statsForm.experience || '—'}
                    </div>
                    <div className="text-[9px] font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                      YEARS EXPERIENCE
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141022] border border-purple-500/10 text-left">
                    <div className="font-syne font-black text-xl text-purple-300">
                      {statsForm.projectsDelivered || '—'}
                    </div>
                    <div className="text-[9px] font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                      PROJECTS DELIVERED
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141022] border border-purple-500/10 text-left">
                    <div className="font-syne font-black text-xl text-purple-300">
                      {statsForm.happyClients || '—'}
                    </div>
                    <div className="text-[9px] font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                      HAPPY CLIENTS
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141022] border border-purple-500/10 text-left">
                    <div className="font-syne font-black text-xl text-purple-300">
                      {statsForm.technologies || '—'}
                    </div>
                    <div className="text-[9px] font-mono-code text-gray-400 uppercase tracking-wider mt-0.5">
                      TECHNOLOGIES
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Editable Input Fields */}
              <div className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span>Years Experience</span>
                    <span className="text-[10px] text-purple-400 lowercase font-mono">e.g. 1+, 2+, 4+</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={statsForm.experience}
                    onChange={(e) => setStatsForm({ ...statsForm, experience: e.target.value })}
                    placeholder="e.g. 1+"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161224] border border-purple-500/25 focus:border-purple-400 focus:outline-none text-white text-xs font-mono-code transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span>Projects Delivered</span>
                    <span className="text-[10px] text-purple-400 lowercase font-mono">e.g. 15+, 25+, 40+</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={statsForm.projectsDelivered}
                    onChange={(e) => setStatsForm({ ...statsForm, projectsDelivered: e.target.value })}
                    placeholder="e.g. 15+"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161224] border border-purple-500/25 focus:border-purple-400 focus:outline-none text-white text-xs font-mono-code transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span>Happy Clients</span>
                    <span className="text-[10px] text-purple-400 lowercase font-mono">e.g. 10+, 20+, 25+</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={statsForm.happyClients}
                    onChange={(e) => setStatsForm({ ...statsForm, happyClients: e.target.value })}
                    placeholder="e.g. 10+"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161224] border border-purple-500/25 focus:border-purple-400 focus:outline-none text-white text-xs font-mono-code transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span>Technologies</span>
                    <span className="text-[10px] text-purple-400 lowercase font-mono">e.g. 10+, 12+, 15+</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={statsForm.technologies}
                    onChange={(e) => setStatsForm({ ...statsForm, technologies: e.target.value })}
                    placeholder="e.g. 10+"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161224] border border-purple-500/25 focus:border-purple-400 focus:outline-none text-white text-xs font-mono-code transition-colors"
                  />
                </div>
              </div>

              {/* Resume Settings Card */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-300 font-syne font-bold text-xs">
                    <FileDown className="w-4 h-4 text-purple-400" />
                    <span>Resume / CV Configuration</span>
                  </div>
                  <a
                    href={resumeUrlInput || '/Sri_Nataraj_Y_Resume.pdf'}
                    download="Sri_Nataraj_Y_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-[11px] font-mono-code text-purple-200 transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5 text-purple-400" />
                    <span>Download Test</span>
                  </a>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span>Resume File Path / External Link</span>
                    <span className="text-[10px] text-purple-400 font-mono">e.g. /Sri_Nataraj_Y_Resume.pdf or URL</span>
                  </label>
                  <input
                    type="text"
                    value={resumeUrlInput}
                    onChange={(e) => setResumeUrlInput(e.target.value)}
                    placeholder="/Sri_Nataraj_Y_Resume.pdf"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161224] border border-purple-500/25 focus:border-purple-400 focus:outline-none text-white text-xs font-mono-code transition-colors"
                  />
                  <p className="text-[10px] text-gray-400 font-mono-code mt-1">
                    Default bundled resume file is stored at <span className="text-purple-300">/Sri_Nataraj_Y_Resume.pdf</span>.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={statsSaving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-syne font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {statsSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Stats & Resume to Database</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs font-mono-code">
                  <Mail className="w-8 h-8 text-purple-400/40 mx-auto mb-2" />
                  No messages received yet. Submit the contact form to see messages here in real-time!
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className="p-4 rounded-xl bg-[#151222] border border-purple-500/15 hover:border-purple-500/30 transition-all flex flex-col gap-2 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-syne font-bold text-sm text-white">
                          {msg.name}
                        </div>
                        <div className="text-xs text-purple-300 font-mono-code">
                          {msg.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-mono-code">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          title="Delete from MongoDB"
                          className="p-1 rounded hover:bg-red-950 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-purple-200">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed bg-[#0d0a16] p-2.5 rounded-lg border border-purple-500/10">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: PROJECTS LIST */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {(projects || []).map((proj) => (
                <div
                  key={proj._id}
                  className="p-4 rounded-xl bg-[#151222] border border-purple-500/15 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code text-[11px] text-purple-400">
                        {proj.number}
                      </span>
                      <span className="font-syne font-bold text-sm text-white">
                        {proj.title}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono-code mt-0.5">
                      {proj.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteProject(proj._id)}
                      title="Delete from MongoDB"
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/20 text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: ADD NEW PROJECT */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code text-gray-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. AI WORKFLOW DASHBOARD"
                  className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-gray-300 mb-1">
                  Subtitle / Highlight
                </label>
                <input
                  type="text"
                  value={newProject.subtitle}
                  onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                  placeholder="e.g. Autonomous agent control center"
                  className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                >
                  <option value="Web Design & Development">Web Design & Development</option>
                  <option value="Dashboard Design & Development">Dashboard Design & Development</option>
                  <option value="Landing Page Design & Development">Landing Page Design & Development</option>
                  <option value="Fullstack MERN Application">Fullstack MERN Application</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Detailed project summary..."
                  className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-gray-300 mb-1">
                  Tech Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB"
                  className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-gray-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-code text-gray-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161224] border border-purple-500/20 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={projectSubmitting}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-syne font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 mt-4"
              >
                {projectSubmitting ? 'Saving to MongoDB...' : 'Save Project into Database'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
