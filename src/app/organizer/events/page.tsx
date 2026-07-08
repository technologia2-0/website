'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Calendar as CalendarIcon, MapPin, Users as UsersIcon } from 'lucide-react'

// Dummy Data
const mockEvents = [
  { id: '1', title: 'Code Genesis', type: 'Hackathon', date: 'Oct 25, 2026', time: '10:00 AM', venue: 'Main Lab 1', registered: 45, capacity: 50, status: 'published' },
  { id: '2', title: 'RoboWars', type: 'Competition', date: 'Oct 26, 2026', time: '02:00 PM', venue: 'Central Courtyard', registered: 12, capacity: 32, status: 'published' },
  { id: '3', title: 'Tech Quiz', type: 'Quiz', date: 'Oct 25, 2026', time: '11:00 AM', venue: 'Seminar Hall B', registered: 80, capacity: 100, status: 'draft' },
  { id: '4', title: 'AI Workshop', type: 'Workshop', date: 'Oct 24, 2026', time: '09:00 AM', venue: 'Lab 3', registered: 60, capacity: 60, status: 'published' },
]

export default function EventManagerPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Event Manager</h1>
          <p className="text-white/60">Create and publish events for the active edition.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Plus className="w-5 h-5" /> New Event
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Schedule & Venue</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockEvents.map((event) => (
                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white mb-1">{event.title}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{event.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-1">
                      <CalendarIcon className="w-4 h-4 text-primary" /> {event.date} • {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <MapPin className="w-3 h-3" /> {event.venue}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${event.registered >= event.capacity ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white/60">
                      {event.registered} / {event.capacity} Filled
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      event.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-white/10 text-white/50 border border-white/10'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
