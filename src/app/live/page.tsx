'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, Medal, Star } from 'lucide-react'

// Live display phases: 'standby' -> 'event_winner' -> 'department_winner'
type DisplayPhase = 'standby' | 'event_winner' | 'department_winner'

export default function LiveDisplay() {
  const [phase, setPhase] = useState<DisplayPhase>('standby')
  const [countdown, setCountdown] = useState(3)

  // Simulation: Organizer triggers phase changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') setPhase('standby')
      if (e.key === '2') {
        setPhase('event_winner')
        triggerConfetti()
      }
      if (e.key === '3') {
        setPhase('department_winner')
        triggerMassiveConfetti()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#ffffff']
    })
  }

  const triggerMassiveConfetti = () => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#ffffff']
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#ffffff']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black">
      
      {/* Absolute Header */}
      <div className="absolute top-8 left-12 right-12 flex justify-between items-center z-10">
        <div className="text-3xl font-bold tracking-tighter text-white/50">TECH<span className="text-primary">NOLOGIA</span></div>
        <div className="px-4 py-1.5 rounded-full bg-red-500/20 text-red-500 border border-red-500/50 font-bold tracking-widest text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'standby' && (
          <motion.div
            key="standby"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-12" />
            <h1 className="text-6xl font-black text-white tracking-tight mb-4">
              PRIZE DISTRIBUTION CEREMONY
            </h1>
            <p className="text-2xl text-white/50 font-medium">Please take your seats. The show is about to begin.</p>
          </motion.div>
        )}

        {phase === 'event_winner' && (
          <motion.div
            key="event_winner"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center w-full max-w-5xl px-8"
          >
            <div className="text-3xl text-primary font-bold tracking-widest uppercase mb-16">Winner • Code Genesis</div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative glass-card border-2 border-primary/50 p-16 rounded-3xl shadow-[0_0_100px_rgba(59,130,246,0.3)]">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                  <Medal className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-7xl font-black text-white mb-6 drop-shadow-lg">ALICE SMITH</h2>
                <div className="text-4xl text-white/80 font-medium mb-8">23IT001</div>
                
                <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/10 border border-white/20">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  <span className="text-3xl font-bold text-white">+50 PR Points to IT Department</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'department_winner' && (
          <motion.div
            key="department_winner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center w-full max-w-7xl px-8"
          >
            <h2 className="text-4xl font-bold text-white/70 tracking-widest uppercase mb-12">And the Best Department is...</h2>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-emerald-500/30 to-blue-500/30 blur-[150px] rounded-full animate-pulse" />
              <div className="relative glass-card border-4 border-emerald-500/50 p-24 rounded-[3rem] shadow-[0_0_150px_rgba(16,185,129,0.3)] bg-black/50">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50"
                >
                  <Trophy className="w-24 h-24 text-white" />
                </motion.div>
                
                <h1 className="text-8xl md:text-[9rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-8 mt-12 drop-shadow-2xl leading-none">
                  COMPUTER<br/>SCIENCE
                </h1>
                
                <div className="flex justify-center items-center gap-12 mt-16 pt-16 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-7xl font-bold text-emerald-400 mb-2">1,240</div>
                    <div className="text-2xl text-white/50 font-medium uppercase tracking-widest">Total PR Points</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 text-white/20 text-xs font-mono">
        Controls: [1] Standby | [2] Reveal Event Winner | [3] Reveal Best Dept
      </div>
    </div>
  )
}
