import React, { useState, useEffect } from 'react';
import { Shield, Lock, Image, FileText, Key, Folder, Camera, Globe, Settings, Plus, MoreVertical, LogOut, Eye, EyeOff, Trash2, Check, Smartphone, RefreshCw } from 'lucide-react';

export default function SecureFolderApp() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [savedPin, setSavedPin] = useState(() => localStorage.getItem('sf_pin') || '1234');
  const [activeApp, setActiveApp] = useState(null);
  const [folderTitle, setFolderTitle] = useState(() => localStorage.getItem('sf_title') || 'Secure Folder');
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('sf_notes') || '[{"id":1,"title":"Recovery Codes","body":"KNOX-8841-9920-1120"}]'));
  const [passwords, setPasswords] = useState(() => JSON.parse(localStorage.getItem('sf_passwords') || '[{"id":1,"site":"Samsung Account","user":"user@galaxy.com","pass":"KnoxVault#2026"}]'));
  const [showPass, setShowPass] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('sf_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('sf_passwords', JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    localStorage.setItem('sf_title', folderTitle);
  }, [folderTitle]);

  const handleDigit = (d) => {
    setError('');
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length === 4) {
      if (next === savedPin) {
        setTimeout(() => {
          setUnlocked(true);
          setPin('');
        }, 150);
      } else {
        setError('Incorrect PIN (Default: 1234)');
        setTimeout(() => setPin(''), 400);
      }
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col items-center justify-between p-8 select-none">
        <div className="mt-12 flex flex-col items-center">
          <div className="w-16 h-16 rounded-3xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/10">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">{folderTitle}</h1>
          <p className="text-xs text-slate-400 mt-1">Secured by Knox</p>
        </div>

        <div className="w-full max-w-xs flex flex-col items-center">
          <div className="flex gap-4 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full transition-all ${
                  pin.length > i ? 'bg-blue-400 scale-110' : 'border border-slate-500'
                }`}
              />
            ))}
          </div>
          {error && <p className="text-xs text-rose-400 mb-3">{error}</p>}

          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(String(n))}
                className="h-14 rounded-2xl bg-slate-800/60 active:bg-blue-600/40 text-xl font-medium transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => { setUnlocked(true); setPin(''); }}
              title="Biometric Quick Unlock"
              className="h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-300"
            >
              Bio
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="h-14 rounded-2xl bg-slate-800/60 active:bg-blue-600/40 text-xl font-medium transition"
            >
              0
            </button>
            <button
              onClick={() => setPin(pin.slice(0, -1))}
              className="h-14 rounded-2xl bg-slate-800/40 text-sm text-slate-300"
            >
              Del
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-500">Default PIN: {savedPin}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#090d16] text-white flex flex-col p-6">
      <div className="flex items-center justify-between mb-6 mt-4">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-semibold">{folderTitle}</h1>
        </div>
        <button
          onClick={() => { setActiveApp(null); setUnlocked(false); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200"
        >
          <Lock className="w-3.5 h-3.5" /> Lock & Exit
        </button>
      </div>

      {!activeApp ? (
        <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[36px] p-6 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-6 mt-2">
            {[
              { id: 'notes', name: 'Secure Notes', icon: FileText, color: 'bg-amber-500' },
              { id: 'pass', name: 'Samsung Pass', icon: Key, color: 'bg-blue-600' },
              { id: 'settings', name: 'Disguise / PIN', icon: Settings, color: 'bg-slate-600' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveApp(item.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-16 h-16 rounded-[22px] ${item.color} flex items-center justify-center shadow-lg group-active:scale-95 transition`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs text-slate-200">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="text-center text-xs text-slate-400 border-t border-white/10 pt-4">
            Replace <code className="text-blue-300">src/SecureFolderApp.jsx</code> with your full Canvas code for all 7 sub-apps.
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-slate-900/80 border border-white/10 rounded-3xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <h2 className="font-semibold capitalize">{activeApp}</h2>
            <button onClick={() => setActiveApp(null)} className="text-xs text-blue-400">
              Back to Folder
            </button>
          </div>

          {activeApp === 'notes' && (
            <div className="space-y-3">
              <button
                onClick={() => {
                  const title = prompt('Note Title:');
                  const body = prompt('Note Content:');
                  if (title) setNotes([...notes, { id: Date.now(), title, body: body || '' }]);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-medium"
              >
                + New Encrypted Note
              </button>
              {notes.map((n) => (
                <div key={n.id} className="p-3.5 rounded-2xl bg-slate-800/70 flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{n.body}</div>
                  </div>
                  <button onClick={() => setNotes(notes.filter((x) => x.id !== n.id))} className="text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeApp === 'pass' && (
            <div className="space-y-3">
              <button
                onClick={() => {
                  const site = prompt('Service / Website:');
                  const pass = prompt('Password:');
                  if (site && pass) setPasswords([...passwords, { id: Date.now(), site, user: 'Personal', pass }]);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-medium"
              >
                + Add Vault Credential
              </button>
              {passwords.map((p) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-slate-800/70 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">{p.site}</div>
                    <div className="text-xs font-mono text-blue-300 mt-1">
                      {showPass[p.id] ? p.pass : '••••••••••••'}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPass({ ...showPass, [p.id]: !showPass[p.id] })}
                    className="p-2 text-slate-300"
                  >
                    {showPass[p.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeApp === 'settings' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Disguise Folder Name</label>
                <input
                  value={folderTitle}
                  onChange={(e) => setFolderTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Change 4-Digit PIN</label>
                <input
                  maxLength={4}
                  placeholder="Enter new 4-digit PIN"
                  onChange={(e) => {
                    if (e.target.value.length === 4) {
                      setSavedPin(e.target.value);
                      localStorage.setItem('sf_pin', e.target.value);
                      alert('PIN Updated!');
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-sm"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
