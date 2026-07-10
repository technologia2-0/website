'use client'

import { useState } from 'react'
import { Plus, MoreVertical, Layout, Edit, Eye, Archive, PlayCircle } from 'lucide-react'

// Dummy data for visual development
const mockEditions = [
  { id: '1', year: 2026, name: 'Technologia 2026', status: 'active', theme: 'Neon Cyberpunk', events: 24, participants: 1240 },
  { id: '2', year: 2025, name: 'Technologia 2025', status: 'archived', theme: 'Future Tech', events: 18, participants: 980 },
  { id: '3', year: 2024, name: 'Technologia 2024', status: 'archived', theme: 'Genesis', events: 12, participants: 650 },
]

export default function EditionsManagerPage() {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Fest Editions</h1>
          <p className="text-white/60">Manage all past, current, and future editions of Technologia.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Plus className="w-5 h-5" /> New Edition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEditions.map((edition) => (
          <div key={edition.id} className={`p-6 rounded-3xl border relative group ${edition.status === 'active' ? 'bg-gradient-to-br from-blue-900/20 to-black border-blue-500/30' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                edition.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                'bg-white/10 text-white/50 border border-white/10'
              }`}>
                {edition.status}
              </div>
              <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{edition.name}</h3>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Layout className="w-4 h-4" /> {edition.theme}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Events</div>
                  <div className="text-xl font-bold text-white">{edition.events}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Participants</div>
                  <div className="text-xl font-bold text-white">{edition.participants}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 flex gap-2">
              <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-colors flex justify-center items-center gap-2">
                <Edit className="w-4 h-4" /> Edit
              </button>
              {edition.status === 'active' ? (
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-colors flex justify-center items-center gap-2">
                  <Eye className="w-4 h-4" /> Dashboard
                </button>
              ) : (
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-colors flex justify-center items-center gap-2">
                  <PlayCircle className="w-4 h-4" /> Set Active
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
