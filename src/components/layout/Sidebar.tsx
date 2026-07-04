import Link from "next/link"
import { Home, Calendar, Trophy, QrCode, Award, Bell, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 h-screen border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col hidden md:flex sticky top-0">
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <Link href="/dashboard" className="text-xl font-bold tracking-tighter text-white">
          TECH<span className="text-primary">NOLOGIA</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-4">Portal</div>
        
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl transition-colors">
          <Home className="w-5 h-5 text-primary" />
          <span className="font-medium">Overview</span>
        </Link>
        
        <Link href="/dashboard/events" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">My Events</span>
        </Link>
        
        <Link href="/dashboard/qr" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <QrCode className="w-5 h-5" />
          <span className="font-medium">QR Pass</span>
        </Link>
        
        <Link href="/dashboard/certificates" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Award className="w-5 h-5" />
          <span className="font-medium">Certificates</span>
        </Link>

        <Link href="/dashboard/leaderboard" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Trophy className="w-5 h-5" />
          <span className="font-medium">Leaderboard</span>
        </Link>
      </div>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="font-medium text-sm">Notifications</span>
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  )
}
