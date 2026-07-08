'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { QrCode as QrIcon, MapPin, Calendar, Clock, CreditCard, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function QRPassPage() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Digital Pass</h1>
        <p className="text-white/60">Present this QR code at venues and food counters.</p>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/5] perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div 
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-black border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col">
            {/* Holographic Header */}
            <div className="h-32 bg-gradient-to-br from-blue-600 via-primary to-purple-600 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 blur-3xl rounded-full mix-blend-overlay"></div>
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                <span className="text-2xl font-black text-white tracking-tighter">TECHNOLOGIA</span>
                <ShieldCheck className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 pb-2 text-center flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white mb-1">Krish Goel</h2>
              <p className="text-primary font-medium text-sm mb-4">Computer Science • Year 3</p>
              
              {/* QR Code Container */}
              <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center shadow-inner relative">
                {/* Decorative scanning line */}
                <motion.div 
                  className="absolute left-0 right-0 h-0.5 bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <QrIcon className="w-full h-full text-black" />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-2 bg-gradient-to-t from-white/[0.05] to-transparent">
              <div className="flex justify-between items-center text-xs text-white/40 font-mono">
                <span>ID: TECH-26-8942</span>
                <span>Valid: Oct 24-26</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 animate-bounce text-white/20">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-black border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col">
            <div className="h-16 bg-white/[0.05] border-b border-white/10 flex items-center justify-center">
              <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Access Details</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Base Access</h3>
                    <p className="text-xs text-white/50">Campus Entry, Food Court, Seminars</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Participant Access</h3>
                    <p className="text-xs text-white/50">Hackathon Labs, Quiz Rooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-40">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-white/30" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">VIP Access</h3>
                    <p className="text-xs text-white/50">Backstage, Coordinator Lounge</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-center space-y-2">
                <p className="text-xs text-white/40">This pass is strictly non-transferable.</p>
                <Link href="/dashboard/help" className="text-xs text-primary hover:underline">
                  Report lost pass
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <p className="text-white/40 text-sm">Click card to flip</p>
    </div>
  )
}

// Inline icons for back of card to avoid missing imports
function CheckCircle(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
}
function Lock(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
}
