import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Mail, MessageSquare, User, AtSign } from 'lucide-react';
import { sendContactMessage } from '../services/api.js';

export default function ContactSection({ profile, onMessageSent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    try {
      setStatus({ loading: true, success: false, error: null });
      const result = await sendContactMessage(formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      if (onMessageSent) onMessageSent(result.data);
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 6000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Error sending message. Check server.' });
    }
  };

  return (
    <section id="contact" className="pt-20 pb-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Connecting Header matching reference: CONTACT • Avatar Circle • LET'S CONNECT */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-14">
          <span className="font-syne font-black text-2xl sm:text-4xl text-purple-300 tracking-wider uppercase">
            CONTACT
          </span>

          {/* Center Glowing Circular Avatar */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-violet-400 to-indigo-600 shadow-xl shadow-purple-600/40">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#120f1e] relative">
              <img
                src="/reference_portfolio.jpg"
                alt="Developer Avatar"
                className="w-full h-full object-cover object-[80%_8%]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-600 border-2 border-[#09080e] flex items-center justify-center text-white">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          <span className="font-syne font-black text-2xl sm:text-4xl text-white tracking-wider uppercase">
            LET'S CONNECT
          </span>
        </div>

        {/* Contact Form Glass Card */}
        <div className="bg-[#12101c]/90 border border-purple-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-purple-950/30 text-left relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-60 h-60 bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm">
                Have a project idea, inquiry, or partnership opportunity? Drop a note below and it will be stored directly into our MongoDB database!
              </p>
            </div>

            {/* Notification Banner */}
            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-purple-950/70 border border-purple-500/50 flex items-center gap-3 text-purple-200 text-xs sm:text-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>Message sent and logged directly into MongoDB! I'll get back to you shortly.</span>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500/50 flex items-center gap-3 text-red-200 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Morgan"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171324] border border-purple-500/20 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171324] border border-purple-500/20 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wider mb-2">
                  Project / Subject
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="MERN Stack Application Development"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171324] border border-purple-500/20 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-500 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono-code text-gray-300 uppercase tracking-wider mb-2">
                  Your Message *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project goals, scope, and timeline..."
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171324] border border-purple-500/20 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-syne font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-purple-900/40 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SAVING TO MONGODB...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer info & Social Links */}
        <div className="mt-16 pt-8 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-gray-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} CREATIVE DEVELOPER. Built with React 19, Node.js, Express & MongoDB.
          </div>
          <div className="flex items-center gap-6 text-purple-300">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="mailto:hello@creativedeveloper.dev" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
