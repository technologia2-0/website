'use client'

import { Bell, Search, Menu, Layers } from "lucide-react"
import { User } from "@supabase/supabase-js"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function DashboardNavbar({ user }: { user?: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const getPageTitle = () => {
    const path = pathname.split('/').pop() || 'overview'
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  // Multi-Edition Context
  const activeEdition = { name: "Technologia 2026", year: 2026 }

  const fullName = user?.user_metadata?.full_name || "User"
  const department = user?.user_metadata?.department || ""
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <header className="h-20 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 relative z-20">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-white/60 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-white hidden md:block">{getPageTitle()}</h1>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 ml-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-white/60 flex items-center gap-1"><Layers className="w-3 h-3" /> {activeEdition.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search events, teams..." 
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <button className="relative p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold text-white leading-none">{fullName}</div>
            <div className="text-xs text-primary font-medium mt-1">{department.toUpperCase()} Dept • 120 Points</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}
