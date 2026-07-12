'use client'

import Link from "next/link"
import { Home, Calendar, Trophy, QrCode, Award, Bell, Settings, LogOut, Search, MapPin, User, Clock, CheckSquare } from "lucide-react"
import { logout } from "@/app/login/actions"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const navItems = [
  { href: "/student", label: "Dashboard", icon: Home },
  { href: "/student/events", label: "Events", icon: Calendar },
  { href: "/student/profile", label: "Profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen border-r border-white/5 bg-black/40 backdrop-blur-3xl flex-col hidden md:flex sticky top-0 relative z-50 shadow-2xl">
      {/* Brand Logo */}
      <div className="h-20 flex items-center px-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <Link href="/student" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">NOLOGIA</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4 px-4">Mission Control</div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group overflow-hidden",
                isActive ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
              )}
              <Icon className={clsx("w-5 h-5 transition-transform duration-300", isActive ? "text-primary" : "group-hover:scale-110 group-hover:text-white")} />
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Search Hint */}
      <div className="px-4 py-3 mx-3 mb-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 text-white/40">
          <Search className="w-4 h-4" />
          <span className="text-xs font-medium">Quick Search</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-white/60 border border-white/10">⌘K</kbd>
      </div>

      <div className="p-3 border-t border-white/5 bg-gradient-to-t from-black/50 to-transparent space-y-1">
        <Link href="/student/notifications" className="flex items-center gap-3 px-4 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-medium text-sm tracking-wide">Notifications</span>
        </Link>
      </div>
    </div>
  )
}
