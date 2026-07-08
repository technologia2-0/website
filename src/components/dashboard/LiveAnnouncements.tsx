'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BellRing, AlertTriangle, CheckCircle, Info, ExternalLink } from 'lucide-react'

// Dummy data representing real-time announcements from Supabase
const announcements = [
  { id: 1, type: 'urgent', title: 'Venue Changed', time: 'Just now', content: 'The venue for Hackathon: Code Genesis has been shifted to Main Auditorium due to high participation.' },
  { id: 2, type: 'event', title: 'Round 2 Started', time: '10 mins ago', content: 'Round 2 of the Treasure Hunt is now live! Check your dashboard for clues.' },
  { id: 3, type: 'success', title: 'Registration Approved', time: '1 hour ago', content: 'Your team "ByteMe" has been approved for the Hackathon.' },
  { id: 4, type: 'info', title: 'Lunch Break', time: '2 hours ago', content: 'Food coupons can be collected from the registration desk.' },
]

export function LiveAnnouncements() {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full inline-block" />
          Live Updates
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 relative z-10 pr-2">
        <AnimatePresence>
          {announcements.map((announcement, i) => {
            const isUrgent = announcement.type === 'urgent'
            const isSuccess = announcement.type === 'success'
            const isEvent = announcement.type === 'event'

            let Icon = Info
            let color = 'from-blue-500 to-cyan-500'
            let textColor = 'text-blue-400'
            let bgLight = 'bg-blue-500/10'
            let borderLight = 'border-blue-500/20'

            if (isUrgent) {
              Icon = AlertTriangle
              color = 'from-red-500 to-rose-500'
              textColor = 'text-red-400'
              bgLight = 'bg-red-500/10'
              borderLight = 'border-red-500/20'
            } else if (isSuccess) {
              Icon = CheckCircle
              color = 'from-emerald-400 to-teal-500'
              textColor = 'text-emerald-400'
              bgLight = 'bg-emerald-500/10'
              borderLight = 'border-emerald-500/20'
            } else if (isEvent) {
              Icon = BellRing
              color = 'from-purple-500 to-pink-500'
              textColor = 'text-purple-400'
              bgLight = 'bg-purple-500/10'
              borderLight = 'border-purple-500/20'
            }

            return (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-2xl ${bgLight} border ${borderLight} group hover:bg-white/[0.04] transition-all`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-[1px] shrink-0 mt-1`}>
                    <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`font-bold ${textColor} leading-tight`}>{announcement.title}</h4>
                      <span className="text-[10px] font-medium text-white/30 whitespace-nowrap">{announcement.time}</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed mb-2">
                      {announcement.content}
                    </p>
                    {isEvent && (
                      <button className="text-xs font-semibold text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                        View Details <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      
      <div className="pt-4 mt-4 border-t border-white/5">
        <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          View All Announcements
        </button>
      </div>
    </div>
  )
}
