'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Calendar as CalendarIcon, MapPin, Trash2, Edit } from 'lucide-react'
import { EventEditorModal } from '@/components/organizer/EventEditorModal'
import { deleteEvent } from '@/app/organizer/(protected)/events/actions'

type Event = {
  id: string
  title: string
  description: string
  event_type: string
  date: string
  time: string
  venue: string
  registration_limit: number | null
  is_team_event: boolean
  max_team_size: number
  is_registration_open: boolean
  registered_count?: number
}

export function EventListClient({ initialEvents }: { initialEvents: Event[] }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const filteredEvents = initialEvents.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingEvent(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      await deleteEvent(id)
    }
  }

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
          <button onClick={handleCreate} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
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
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No events found. Click "New Event" to create one.
                  </td>
                </tr>
              ) : filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white mb-1">{event.title}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{event.event_type} {event.is_team_event && `• Team (${event.max_team_size})`}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-1">
                      <CalendarIcon className="w-4 h-4 text-primary" /> {event.date || 'TBD'} • {event.time || 'TBD'}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <MapPin className="w-3 h-3" /> {event.venue || 'TBD'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${(event.registered_count || 0) >= (event.registration_limit || 9999) ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: event.registration_limit ? `${((event.registered_count || 0) / event.registration_limit) * 100}%` : '0%' }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white/60">
                      {event.registered_count || 0} / {event.registration_limit || '∞'} Filled
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      event.is_registration_open ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {event.is_registration_open ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(event)} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EventEditorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        event={editingEvent} 
      />
    </div>
  )
}
