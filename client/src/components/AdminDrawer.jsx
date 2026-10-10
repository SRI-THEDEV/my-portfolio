import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Mail, 
  Plus, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  Server, 
  FolderGit2, 
  ExternalLink,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { 
  fetchMessages, 
  deleteMessage, 
  createProject, 
  deleteProject, 
  checkHealth 
} from '../services/api.js';

export default function AdminDrawer({ isOpen, onClose, projects, onProjectCreated, onProjectDeleted, onLogout }) {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverHealth, setServerHealth] = useState(null);

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
      const [msgs, health] = await Promise.all([
        fetchMessages().catch(() => []),
        checkHealth().catch(() => null)
      ]);
      setMessages(msgs);
      setServerHealth(health);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        <div className="px-6 pt-4 border-b border-purple-500/10 flex gap-4 text-xs font-mono-code">
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
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
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
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
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'add'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ Add to DB</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
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
