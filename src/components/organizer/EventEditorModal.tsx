'use client'

import { useState } from 'react'
import { X, Calendar as CalendarIcon, Clock, MapPin, Users, Settings } from 'lucide-react'
import { createEvent, updateEvent } from '@/app/organizer/(protected)/events/actions'

type Event = {
  id: string
  title: string
  description: string
  event_type: string
  date: string
  time: string
  venue: string
  building: string
  room_number: string
  certificate_eligibility: string
  registration_limit: number | null
  is_team_event: boolean
  max_team_size: number
  is_registration_open: boolean
}

interface Props {
  event?: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventEditorModal({ event, isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const isEditing = !!event

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    try {
      if (isEditing) {
        await updateEvent(event.id, formData)
      } else {
        await createEvent(formData)
      }
      onClose()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <form id="event-form" action={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Event Title</label>
                <input required type="text" name="title" defaultValue={event?.title} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Code Genesis" />
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Description</label>
                <textarea name="description" defaultValue={event?.description} rows={3} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Detailed description of the event..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Event Type</label>
                  <select name="event_type" defaultValue={event?.event_type || 'technical'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="technical">Technical</option>
                    <option value="cultural">Cultural</option>
                    <option value="gaming">Gaming</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Venue</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input type="text" name="venue" defaultValue={event?.venue} className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Main Auditorium" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Building</label>
                  <input type="text" name="building" defaultValue={event?.building} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Block A" />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Room Number</label>
                  <input type="text" name="room_number" defaultValue={event?.room_number} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. 104" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input type="date" name="date" defaultValue={event?.date} className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input type="time" name="time" defaultValue={event?.time} className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Total Capacity</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input type="number" name="capacity" defaultValue={event?.registration_limit || ''} placeholder="Leave empty for unlimited" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Team Size (Max)</label>
                  <input type="number" name="max_team_size" defaultValue={event?.max_team_size || 1} min={1} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                  <input type="checkbox" name="is_team_event" defaultChecked={event?.is_team_event} className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary focus:ring-offset-0 bg-black" />
                  <div>
                    <div className="font-bold text-white text-sm">Is Team Event?</div>
                    <div className="text-xs text-white/50">Requires users to form a team before registering</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                  <input type="checkbox" name="is_registration_open" defaultChecked={event ? event.is_registration_open : true} className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary focus:ring-offset-0 bg-black" />
                  <div>
                    <div className="font-bold text-white text-sm">Registration Open</div>
                    <div className="text-xs text-white/50">Allow students to register for this event right now</div>
                  </div>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Certificate Eligibility</label>
                <select name="certificate_eligibility" defaultValue={event?.certificate_eligibility || 'participants_and_winners'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option value="none">None</option>
                  <option value="winners_only">Winners Only</option>
                  <option value="participants_and_winners">Participants and Winners</option>
                </select>
              </div>

            </div>

            {error && <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>}

          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-white/10 bg-black flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/70 font-medium hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" form="event-form" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center gap-2">
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  )
}
