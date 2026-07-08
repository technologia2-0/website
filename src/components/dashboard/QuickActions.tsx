'use client'

import { motion } from 'framer-motion'
import { Calendar, QrCode, Award, Bell, FileText, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const actions = [
  { href: '/dashboard/events', label: 'My Events', icon: Calendar, color: 'from-blue-500 to-cyan-500', size: 'large' },
  { href: '/dashboard/qr', label: 'QR Pass', icon: QrCode, color: 'from-purple-500 to-pink-500', size: 'large' },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award, color: 'from-amber-400 to-orange-500', size: 'small' },
  { href: '/dashboard/results', label: 'Results', icon: FileText, color: 'from-emerald-400 to-teal-500', size: 'small' },
  { href: '/dashboard/notifications', label: 'Updates', icon: Bell, color: 'from-rose-400 to-red-500', size: 'small' },
  { href: '/dashboard/help', label: 'Help Center', icon: HelpCircle, color: 'from-gray-400 to-slate-500', size: 'small' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, i) => {
        const Icon = action.icon
        const isLarge = action.size === 'large'
        return (
          <Link 
            key={action.href} 
            href={action.href}
            className={`block group ${isLarge ? 'col-span-2' : 'col-span-1'}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5 h-full flex ${isLarge ? 'flex-row items-center justify-between' : 'flex-col items-start justify-between min-h-[120px]'} hover:bg-white/10 transition-all duration-300`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${action.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-[1px] shadow-lg mb-2 ${isLarge ? 'mb-0 order-last' : ''}`}>
                <div className="w-full h-full bg-black/50 backdrop-blur-md rounded-[11px] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-white text-lg">{action.label}</h3>
                {isLarge && <p className="text-sm text-white/50 mt-1">Manage and view details</p>}
              </div>
            </motion.div>
          </Link>
        )
      })}
    </div>
  )
}
