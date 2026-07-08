'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Users, MapPin, Download, AlertCircle, CalendarClock, MessageCircle, HelpCircle } from 'lucide-react'

type Tab = 'overview' | 'rules' | 'team' | 'updates' | 'resources' | 'faq'

export function EventTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'rules', label: 'Rules & Req.', icon: AlertCircle },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'updates', label: 'Live Updates', icon: MessageCircle },
    { id: 'resources', label: 'Resources', icon: Download },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ]

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto scrollbar-hide gap-2 border-b border-white/10 pb-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 relative ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-primary' : ''}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 text-white/50 mb-2">
                    <CalendarClock className="w-5 h-5 text-primary" />
                    <span className="font-semibold uppercase tracking-wider text-xs">Date & Time</span>
                  </div>
                  <div className="text-xl font-bold text-white">October 24, 2026</div>
                  <div className="text-white/70">11:30 AM - 05:00 PM</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 text-white/50 mb-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold uppercase tracking-wider text-xs">Venue</span>
                  </div>
                  <div className="text-xl font-bold text-white">Lab 305</div>
                  <div className="text-white/70">CS Department Block, 3rd Floor</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Event Description</h3>
                <p className="text-white/60 leading-relaxed">
                  Code Genesis is the flagship hackathon of Technologia. Over the course of 24 hours, you and your team will build innovative solutions to real-world problems. The event consists of three rounds: Ideation, Prototype, and Final Pitch. Mentors will be available throughout the event.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Coordinators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center font-bold">AS</div>
                    <div>
                      <div className="font-medium text-white">Alice Smith</div>
                      <div className="text-xs text-white/40">Faculty Coordinator</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center font-bold">BJ</div>
                    <div>
                      <div className="font-medium text-white">Bob Jones</div>
                      <div className="text-xs text-white/40">Student Coordinator</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rules' && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-400 mb-2">Important Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-white/70">
                  <li>Please carry your university ID card and the fest digital QR pass.</li>
                  <li>Laptops must be fully charged as power sockets are limited.</li>
                  <li>Use of unauthorized pre-built templates will lead to disqualification.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Required Items</h3>
                <div className="flex flex-wrap gap-2">
                  {['Laptop', 'Charger', 'Extension Board (Optional)', 'Water Bottle'].map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl text-white/40"
            >
              Team management UI goes here (Phase 3)
            </motion.div>
          )}

          {activeTab === 'updates' && (
            <motion.div
              key="updates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl text-white/40"
            >
              Live updates feed goes here
            </motion.div>
          )}
          
          {(activeTab === 'resources' || activeTab === 'faq') && (
            <motion.div
              key="other"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl text-white/40"
            >
              Content for {activeTab} goes here
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
