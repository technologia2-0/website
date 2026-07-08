'use client'

import { useState } from 'react'
import { User, Bell, Shield, Palette, Smartphone, Globe, Save } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Settings</h1>
        <p className="text-white/60">Manage your account preferences and application settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1 shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                  isActive ? 'bg-white/10 text-white shadow-inner' : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-[2px]">
                  <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-3xl font-bold text-white">
                    KG
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Profile Picture</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">Change</button>
                    <button className="px-4 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Full Name</label>
                    <input type="text" defaultValue="Krish Goel" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Roll Number</label>
                    <input type="text" defaultValue="TECH-26-8942" disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Email Address</label>
                    <input type="email" defaultValue="krish@technologia.fest" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Department</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Data Science</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Bio</label>
                  <textarea rows={3} defaultValue="Web developer and hackathon enthusiast." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors resize-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { title: 'Event Updates', desc: 'Schedule changes, venue updates, and announcements.', checked: true },
                  { title: 'Team Invitations', desc: 'When someone invites you to join their team.', checked: true },
                  { title: 'Results & Certificates', desc: 'When new results or certificates are published.', checked: true },
                  { title: 'Promotional', desc: 'Sponsor offers and future event notifications.', checked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-white/50">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {(activeTab === 'security' || activeTab === 'appearance') && (
            <div className="flex flex-col items-center justify-center h-64 text-white/40">
              <Shield className="w-12 h-12 mb-4 opacity-20" />
              <p>Settings for {activeTab} will appear here.</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded-xl font-semibold text-white/60 hover:text-white transition-colors">Cancel</button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-shadow shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
