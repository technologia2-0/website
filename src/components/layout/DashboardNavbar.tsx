'use client'

import { Bell, Search, Menu, Layers, User as UserIcon, Settings, Key, LogOut, ChevronDown } from "lucide-react"
import { User } from "@supabase/supabase-js"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { logout } from "@/app/login/actions"

export function DashboardNavbar({ user }: { user?: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const getPageTitle = () => {
    const path = pathname.split('/').pop() || 'overview'
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Multi-Edition Context
  const activeEdition = { name: "Technologia 2026", year: 2026 }

  const fullName = user?.user_metadata?.full_name || "User"
  const department = user?.user_metadata?.department || ""
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <header className="h-20 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 relative z-50">
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
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity"
          >
            <div className="hidden md:block text-right">
              <div className="text-sm font-bold text-white leading-none">{fullName}</div>
              <div className="text-xs text-primary font-medium mt-1">{department.toUpperCase()} Dept</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {initials}
            </div>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-gray-900 border border-white/10 shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-white/10 mb-2">
                <p className="text-sm text-white font-bold truncate">{fullName}</p>
                <p className="text-xs text-white/50 truncate">{user?.email}</p>
              </div>
              
              <Link href="/dashboard/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                <UserIcon className="w-4 h-4" /> Profile
              </Link>
              <Link href="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <Link href="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                <Key className="w-4 h-4" /> Change Password
              </Link>
              
              <div className="h-px bg-white/10 my-2" />
              
              <form action={logout}>
                <button type="submit" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
