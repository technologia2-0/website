'use client'

import { useState, useEffect } from 'react'
import { Terminal, Lock, KeyRound, ArrowRight, Skull, ShieldAlert, Crosshair } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TreasureHuntPage() {
  const [inputStr, setInputStr] = useState('')
  const [level, setLevel] = useState(1)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Initializing Technologia Hunt Protocol...',
    'Establishing secure connection...',
    'Connection established. Welcome, Operative.',
    'LEVEL 1: The Awakening',
  ])

  const currentClue = "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputStr.trim()) return

    const newOutput = [...terminalOutput, `> ${inputStr}`]
    
    if (inputStr.toLowerCase() === 'echo') {
      newOutput.push('ACCESS GRANTED. LEVEL 1 COMPLETE.')
      newOutput.push('Decrypting Level 2...')
      setTimeout(() => setLevel(2), 1000)
    } else {
      newOutput.push('ACCESS DENIED. INCORRECT PASSPHRASE.')
    }
    
    setTerminalOutput(newOutput)
    setInputStr('')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-emerald-500 tracking-tight flex items-center gap-3">
            <Terminal className="w-8 h-8" /> HUNT_PROTOCOL
          </h1>
          <p className="text-emerald-500/60 font-mono text-sm mt-1">Status: Active | Rank: 42 | Points: 450</p>
        </div>
        
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-500 font-mono">
            <Crosshair className="w-4 h-4" /> LEVEL {level}
          </div>
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-500 font-mono">
            <Skull className="w-4 h-4" /> 02:14:59
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Main Terminal Area */}
        <div className="lg:col-span-2 rounded-xl bg-black border border-emerald-500/30 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="h-10 bg-emerald-950/50 border-b border-emerald-500/30 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            <span className="ml-2 font-mono text-xs text-emerald-500/50">root@technologia:~</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 font-mono text-emerald-500/80 text-sm space-y-2">
            {terminalOutput.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.startsWith('>') ? 'text-white' : line.includes('DENIED') ? 'text-red-400' : 'text-emerald-500'}
              >
                {line}
              </motion.div>
            ))}
            
            <div className="mt-8 p-4 border border-emerald-500/20 bg-emerald-500/5 rounded text-emerald-400">
              <div className="text-xs text-emerald-500/50 mb-2">TARGET_DATA:</div>
              {currentClue}
            </div>
          </div>

          <div className="p-4 bg-emerald-950/30 border-t border-emerald-500/30 relative z-10">
            <form onSubmit={handleCommand} className="flex items-center gap-3">
              <span className="font-mono text-emerald-500 font-bold">$</span>
              <input 
                type="text" 
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value)}
                className="flex-1 bg-transparent font-mono text-white focus:outline-none placeholder-emerald-500/30"
                placeholder="Enter passphrase or command..."
                autoFocus
              />
              <button type="submit" className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 rounded transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6 flex flex-col min-h-0">
          <div className="p-6 rounded-xl bg-[#050505] border border-white/5 h-1/2 flex flex-col">
            <h3 className="font-mono text-white/50 text-sm mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" /> MISSION_LOG
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-2">
              {[
                { l: 1, status: level > 1 ? 'solved' : 'active' },
                { l: 2, status: level > 2 ? 'solved' : level === 2 ? 'active' : 'locked' },
                { l: 3, status: 'locked' },
                { l: 4, status: 'locked' },
                { l: 5, status: 'locked' },
              ].map((item) => (
                <div key={item.l} className={`flex items-center justify-between p-3 rounded border ${
                  item.status === 'solved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' :
                  item.status === 'active' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]' :
                  'bg-white/5 border-white/5 text-white/30'
                }`}>
                  <span>LEVEL {item.l}</span>
                  <span>{item.status.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/20 h-1/2 flex flex-col justify-center items-center text-center">
            <ShieldAlert className="w-12 h-12 text-red-500/50 mb-4" />
            <h3 className="font-mono text-red-500 font-bold mb-2">WARNING</h3>
            <p className="font-mono text-red-400/70 text-xs">Multiple failed attempts will result in a temporary terminal lockout. Proceed with caution.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
