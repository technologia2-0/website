'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Sparkles, Megaphone } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function LiveDisplayPage() {
  const [displayState, setDisplayState] = useState<'welcome' | 'schedule' | 'reveal'>('welcome')
  const [revealStep, setRevealStep] = useState(0)

  // Simulation: Cycle through states for demonstration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') setDisplayState('welcome')
      if (e.key === '2') setDisplayState('schedule')
      if (e.key === '3') {
        setDisplayState('reveal')
        setRevealStep(0)
      }
      if (e.key === 'ArrowRight' && displayState === 'reveal') {
        setRevealStep(prev => prev + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [displayState])

  // Fire confetti on reveal
  useEffect(() => {
    if (displayState === 'reveal' && revealStep === 3) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [displayState, revealStep])

  return (
    <div className="w-full h-full p-12 flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="absolute top-12 left-12 right-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
            <span className="text-2xl font-black text-white">T</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">TECHNOLOGIA 2026</h1>
            <p className="text-primary font-bold tracking-widest uppercase">Live Display</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-mono font-black text-white tabular-nums">14:05:22</div>
          <p className="text-white/50 font-bold tracking-widest uppercase">Day 2 • Main Auditorium</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          
          {displayState === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center space-y-12"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-20 bg-primary/20 blur-[100px] rounded-full" />
                <h2 className="text-8xl font-black text-white tracking-tighter relative z-10">
                  WELCOME TO <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">THE FUTURE</span>
                </h2>
              </div>
              <p className="text-3xl text-white/60 font-medium">Please take your seats. The opening ceremony begins shortly.</p>
            </motion.div>
          )}

          {displayState === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-7xl mx-auto"
            >
              <div className="flex items-center gap-6 mb-12">
                <Megaphone className="w-12 h-12 text-primary" />
                <h2 className="text-6xl font-black text-white">Up Next</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { time: '14:30', title: 'RoboWars Finale', venue: 'Central Arena', active: true },
                  { time: '16:00', title: 'AI Ethics Panel', venue: 'Seminar Hall A', active: false },
                  { time: '18:00', title: 'Prize Distribution', venue: 'Main Auditorium', active: false },
                ].map((event, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    key={i} 
                    className={`p-8 rounded-3xl border flex items-center justify-between ${event.active ? 'bg-gradient-to-r from-blue-900/40 to-black border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10'}`}
                  >
                    <div className="flex items-center gap-8">
                      <div className={`text-4xl font-black font-mono ${event.active ? 'text-primary' : 'text-white/40'}`}>
                        {event.time}
                      </div>
                      <div>
                        <h3 className={`text-4xl font-bold mb-2 ${event.active ? 'text-white' : 'text-white/60'}`}>{event.title}</h3>
                        <p className={`text-xl ${event.active ? 'text-white/80' : 'text-white/40'}`}>{event.venue}</p>
                      </div>
                    </div>
                    {event.active && (
                      <div className="px-6 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold animate-pulse text-xl tracking-wider">
                        STARTING SOON
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {displayState === 'reveal' && (
            <motion.div
              key="reveal"
              className="text-center w-full"
            >
              {revealStep === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <Trophy className="w-32 h-32 text-yellow-400 mx-auto opacity-50 animate-pulse" />
                  <h2 className="text-6xl font-black text-white tracking-tighter">PREPARING TO REVEAL<br/>THE OVERALL CHAMPIONS</h2>
                </motion.div>
              )}

              {revealStep === 1 && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-12 rounded-[3rem] bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/30 inline-block">
                  <div className="text-amber-500 font-bold tracking-widest text-2xl uppercase">2nd Runner Up</div>
                  <h3 className="text-6xl font-black text-white">Data Science</h3>
                  <div className="text-4xl font-mono text-amber-500/80">980 Points</div>
                </motion.div>
              )}

              {revealStep === 2 && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-12 rounded-[3rem] bg-gradient-to-br from-slate-600/20 to-black border border-slate-400/30 inline-block">
                  <div className="text-slate-400 font-bold tracking-widest text-2xl uppercase">1st Runner Up</div>
                  <h3 className="text-6xl font-black text-white">Information Technology</h3>
                  <div className="text-4xl font-mono text-slate-400/80">1220 Points</div>
                </motion.div>
              )}

              {revealStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="space-y-8 relative"
                >
                  <div className="absolute inset-0 bg-yellow-500/20 blur-[150px] rounded-full pointer-events-none" />
                  <Trophy className="w-48 h-48 text-yellow-400 mx-auto drop-shadow-[0_0_50px_rgba(250,204,21,0.5)]" />
                  <div className="text-yellow-400 font-bold tracking-[0.5em] text-3xl uppercase">Champions</div>
                  <h3 className="text-[8rem] leading-none font-black text-white">Computer Science</h3>
                  <div className="text-6xl font-black font-mono text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]">1450 Points</div>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Admin Controls (Hidden on actual projector, visible to operator) */}
      <div className="absolute bottom-4 left-4 flex gap-2 opacity-10 hover:opacity-100 transition-opacity z-50">
        <div className="px-4 py-2 bg-black/80 text-white/50 text-xs font-mono rounded border border-white/10">
          Controls: Press 1 (Welcome), 2 (Schedule), 3 (Reveal). Press Right Arrow to step through Reveal.
        </div>
      </div>
    </div>
  )
}
