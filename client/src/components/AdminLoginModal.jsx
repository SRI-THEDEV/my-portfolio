import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle, Loader2 } from 'lucide-react';
import { verifyAdminPasscode, setAdminKey } from '../services/api.js';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the admin passcode.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await verifyAdminPasscode(passcode.trim());
      setAdminKey(passcode.trim());
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Incorrect admin passcode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#0f0d1a] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative shadow-purple-950/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#181428] text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-500/40 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-900/30 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 shadow-inner shadow-purple-500/20">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="font-syne font-bold text-xl text-white tracking-wide">
            Admin Access Required
          </h3>
          <p className="text-xs text-purple-300/70 font-mono-code mt-1.5 max-w-xs">
            Enter your admin passcode to access the MongoDB Live Panel & backend controls.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono-code flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono-code uppercase text-gray-400 mb-2 tracking-wider">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter passcode..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-[#171324] border border-purple-500/25 focus:border-purple-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-gray-500 font-mono-code">
              Default development passcode: <code className="text-purple-400 font-bold">admin123</code>
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-syne font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Admin Panel</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-gray-400 hover:text-white text-xs font-mono-code transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
