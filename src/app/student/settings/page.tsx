'use client'

import { useState } from 'react'
import { Bell, Key, Save, Image as ImageIcon } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications')

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Password', icon: Key },
    { id: 'account', label: 'Account Data', icon: ImageIcon },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Settings</h1>
        <p className="text-white/60">Manage your account security and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-semibold ${
                  isActive ? 'bg-white text-black shadow-lg scale-105' : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : ''}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { title: 'Event Updates', desc: 'Schedule changes, venue updates, and announcements.', checked: true },
                  { title: 'Team Invitations', desc: 'When someone invites you to join their team.', checked: true },
                  { title: 'Results & Certificates', desc: 'When new results or certificates are published.', checked: true },
                  { title: 'Promotional', desc: 'Sponsor offers and future event notifications.', checked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors">
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-white/50">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Change Password</h3>
              
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
               <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Account Data</h3>
               
               <div className="space-y-6">
                 <div>
                   <h4 className="font-bold text-white mb-2">Export Data</h4>
                   <p className="text-sm text-white/50 mb-4">Download a copy of all your registrations, results, and certificates.</p>
                   <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10">
                     Request Data Export
                   </button>
                 </div>
                 
                 <div className="pt-6 border-t border-white/10">
                   <h4 className="font-bold text-red-500 mb-2">Danger Zone</h4>
                   <p className="text-sm text-white/50 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                   <button className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium transition-colors border border-red-500/20">
                     Delete Account
                   </button>
                 </div>
               </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded-xl font-semibold text-white/60 hover:text-white transition-colors">Discard</button>
            <button className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
