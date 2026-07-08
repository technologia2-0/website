'use client'

import { useState, useEffect } from 'react'
import { Search, Command, MapPin, Calendar, QrCode, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const actions = [
    { id: '1', title: 'View My Events', icon: Calendar, shortcut: 'E', action: () => router.push('/dashboard/events') },
    { id: '2', title: 'Open QR Pass', icon: QrCode, shortcut: 'Q', action: () => router.push('/dashboard/qr') },
    { id: '3', title: 'Find Venue', icon: MapPin, shortcut: 'V', action: () => router.push('/dashboard/venues') },
    { id: '4', title: 'View Results', icon: FileText, shortcut: 'R', action: () => router.push('/dashboard/results') },
  ]

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase())
  )

  const handleAction = (actionFn: () => void) => {
    actionFn()
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-white/40 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search commands, events, participants..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-lg"
              />
              <kbd className="px-2 py-1 rounded-md bg-white/10 text-xs font-semibold text-white/60 border border-white/10">ESC</kbd>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Quick Actions</div>
                  {filteredActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleAction(action.action)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-white/60 group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-white/80 group-hover:text-white font-medium">{action.title}</span>
                        </div>
                        <kbd className="px-2 py-1 rounded bg-black border border-white/10 text-xs font-mono text-white/40 group-hover:text-primary/70">{action.shortcut}</kbd>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-white/40">
                  <Command className="w-8 h-8 mx-auto mb-3 opacity-20" />
                  <p>No results found for "{query}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
