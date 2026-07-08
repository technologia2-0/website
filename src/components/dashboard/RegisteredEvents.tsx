'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const registeredEvents = [
  { id: '1', title: 'Hackathon: Code Genesis', date: 'Oct 24, 2026', time: '11:30 AM', venue: 'Lab 305', type: 'Team', status: 'Approved', color: 'from-blue-500 to-cyan-500' },
  { id: '2', title: 'Tech Quiz', date: 'Oct 25, 2026', time: '10:00 AM', venue: 'Seminar Hall 1', type: 'Individual', status: 'Pending', color: 'from-purple-500 to-pink-500' },
  { id: '3', title: 'Treasure Hunt', date: 'Oct 26, 2026', time: '09:00 AM', venue: 'Campus Wide', type: 'Team', status: 'Approved', color: 'from-amber-400 to-orange-500' },
]

export function RegisteredEvents() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full inline-block" />
          My Registered Events
        </h2>
        <Link href="/dashboard/events" className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {registeredEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${event.color}`} />
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${event.color} p-[1px]`}>
                  <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                    {event.type === 'Team' ? <Users className="w-5 h-5 text-white" /> : <Calendar className="w-5 h-5 text-white" />}
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider ${
                  event.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {event.status}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">{event.title}</h3>
              
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Date</span>
                  <span className="text-white/80 font-medium">{event.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Time</span>
                  <span className="text-white/80 font-medium">{event.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Venue</span>
                  <span className="text-white/80 font-medium">{event.venue}</span>
                </div>
              </div>

              <Link 
                href={`/dashboard/events/${event.id}`}
                className="block w-full text-center py-2.5 rounded-xl bg-white/5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
