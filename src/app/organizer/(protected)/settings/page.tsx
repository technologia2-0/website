'use client'

import { useState } from 'react'
import { Save, Upload, Palette, Monitor } from 'lucide-react'

export default function GlobalSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Global Settings</h1>
        <p className="text-white/60">Configure the appearance and behavior of the active fest edition.</p>
      </div>

      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8">
        {/* Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Monitor className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-white">Public Website Branding</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Fest Name (Public)</label>
              <input type="text" defaultValue="Technologia 2026" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Tagline</label>
              <input type="text" defaultValue="Into the Cyber Nexus" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Hero Banner Video/Image URL</label>
            <div className="flex gap-4">
              <input type="text" placeholder="https://..." className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors flex items-center gap-2">
                <Upload className="w-5 h-5" /> Upload
              </button>
            </div>
          </div>
        </div>

        {/* Theming */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Palette className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Theme & Colors</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Primary (Brand)', color: 'bg-blue-500' },
              { label: 'Secondary', color: 'bg-indigo-500' },
              { label: 'Accent', color: 'bg-cyan-400' },
              { label: 'Background', color: 'bg-[#050505]' },
            ].map((c, i) => (
              <div key={i} className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider">{c.label}</label>
                <div className={`h-16 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer ${c.color} relative group`}>
                  <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center font-mono text-xs text-white transition-opacity">
                    Edit
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Access */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Monitor className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-white">Platform Controls</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <h3 className="font-bold text-white mb-1">Accept New Registrations</h3>
                <p className="text-sm text-white/50">Allow new students to sign up for this edition.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
          <button className="px-6 py-3 rounded-xl font-bold text-white/60 hover:text-white transition-colors">Discard</button>
          <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
            <Save className="w-5 h-5" /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
