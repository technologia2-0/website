'use client'

import { motion } from 'framer-motion'
import { Award, Target, Trophy, Clock, Zap, Star } from 'lucide-react'

const achievements = [
  { id: 1, title: 'Early Bird', description: 'Registered in the first 24 hours', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', unlocked: true },
  { id: 2, title: 'Social Butterfly', description: 'Joined 3 or more team events', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', unlocked: true },
  { id: 3, title: 'Quiz Master', description: 'Top 10 in Tech Quiz', icon: Target, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', unlocked: false },
  { id: 4, title: 'Code Ninja', description: 'Won the Hackathon', icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', unlocked: false },
]

// Note: Users icon is imported above, but actually let's just use Star since Users wasn't imported.
import { Users } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">My Journey</h1>
        <p className="text-white/60">Your personal analytics, achievements, and fest timeline.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Events Participated', value: '4', icon: Target, color: 'text-blue-400' },
          { label: 'Certificates Earned', value: '2', icon: Award, color: 'text-emerald-400' },
          { label: 'Total PR Points', value: '120', icon: Zap, color: 'text-yellow-400' },
          { label: 'Hours Spent', value: '14h', icon: Clock, color: 'text-purple-400' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
            >
              <Icon className={`w-5 h-5 mb-4 ${stat.color}`} />
              <div>
                <div className="text-3xl font-black text-white tabular-nums">{stat.value}</div>
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Achievements */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-400 rounded-full inline-block" />
            Badges & Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach, i) => {
              const Icon = ach.icon
              return (
                <div key={i} className={`p-4 rounded-2xl border ${ach.unlocked ? ach.border + ' ' + ach.bg : 'border-white/5 bg-white/[0.01] opacity-50'} flex gap-4 transition-all hover:opacity-100`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ach.unlocked ? ach.bg : 'bg-white/5'}`}>
                    <Icon className={`w-6 h-6 ${ach.unlocked ? ach.color : 'text-white/20'}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${ach.unlocked ? 'text-white' : 'text-white/40'}`}>{ach.title}</h3>
                    <p className="text-xs text-white/50 mt-1">{ach.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full inline-block" />
            Timeline
          </h2>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative">
            <div className="absolute left-8 top-8 bottom-8 w-px bg-white/10" />
            <div className="space-y-6 relative z-10">
              {[
                { title: 'Registered for Fest', time: 'Oct 10, 2026', done: true },
                { title: 'QR Pass Generated', time: 'Oct 15, 2026', done: true },
                { title: 'Checked In', time: 'Oct 24, 09:15 AM', done: true },
                { title: 'Code Genesis Winner', time: 'Pending', done: false },
                { title: 'Certificate Issued', time: 'Pending', done: false },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${step.done ? 'bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#1a1a1a] border-2 border-white/20'}`} />
                  <div>
                    <div className={`font-bold ${step.done ? 'text-white' : 'text-white/40'}`}>{step.title}</div>
                    <div className="text-xs text-white/50">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
