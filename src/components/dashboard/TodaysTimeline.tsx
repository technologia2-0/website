'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, CheckCircle2, PlayCircle, CircleDashed } from 'lucide-react'

// Dummy data for now until we connect to Supabase events table
const timelineEvents = [
  { id: 1, time: '09:00 AM', title: 'Registration & Kit Distribution', venue: 'Main Auditorium', status: 'completed' },
  { id: 2, time: '10:00 AM', title: 'Inauguration Ceremony', venue: 'Main Auditorium', status: 'completed' },
  { id: 3, time: '11:30 AM', title: 'Hackathon: Code Genesis', venue: 'Lab 305', status: 'running' },
  { id: 4, time: '02:00 PM', title: 'Lunch Break', venue: 'Food Court', status: 'upcoming' },
  { id: 5, time: '03:30 PM', title: 'Tech Talk: AI Future', venue: 'Seminar Hall 1', status: 'upcoming' },
]

export function TodaysTimeline() {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full inline-block" />
          Today's Timeline
        </h2>
        <span className="text-sm font-medium text-white/40">Day 1 of 3</span>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {timelineEvents.map((event, index) => {
          const isCompleted = event.status === 'completed'
          const isRunning = event.status === 'running'
          const isUpcoming = event.status === 'upcoming'

          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full border-[3px] border-[#050505] bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-black rounded-full" />}
                {isRunning && (
                  <div className="relative flex items-center justify-center">
                    <PlayCircle className="w-5 h-5 text-primary bg-black rounded-full relative z-10" />
                    <span className="absolute w-5 h-5 rounded-full bg-primary/40 animate-ping" />
                  </div>
                )}
                {isUpcoming && <CircleDashed className="w-5 h-5 text-white/20 bg-black rounded-full" />}
              </div>
              
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors relative">
                {isRunning && (
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl animate-pulse" />
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 relative z-10">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isRunning ? 'text-primary' : 'text-white/40'}`}>
                    {event.time}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    isCompleted ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    isRunning ? 'bg-primary/10 text-primary border-primary/20' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <h3 className={`font-bold text-lg mb-1 relative z-10 ${isUpcoming ? 'text-white/70' : 'text-white'}`}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-white/40 relative z-10">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
