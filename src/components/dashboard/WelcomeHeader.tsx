'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { Sparkles, MapPin } from 'lucide-react'

export function WelcomeHeader({ fullName, department, initials }: { fullName: string, department: string, initials: string }) {
  const [time, setTime] = useState(new Date())
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/30 to-black border border-white/10 p-8 shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-500 p-[2px] shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="w-full h-full bg-black/80 backdrop-blur-xl rounded-[14px] flex items-center justify-center">
              <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
                {initials}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">Mission Control</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Welcome back, {fullName.split(' ')[0]}
            </h1>
            <div className="flex items-center gap-3 text-white/50 text-sm font-medium">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wide">
                {department} Dept
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Campus Main Block
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
          <div className="text-sm font-medium text-white/50 uppercase tracking-widest">
            {isMounted ? format(time, 'EEEE, MMM do') : 'Loading...'}
          </div>
          <div className="text-3xl font-black text-white tracking-tight tabular-nums">
            {isMounted ? format(time, 'HH:mm:ss') : '--:--:--'}
          </div>
          <div className="text-xs text-primary font-semibold">Fest Day 1</div>
        </div>
      </div>
    </motion.div>
  )
}
