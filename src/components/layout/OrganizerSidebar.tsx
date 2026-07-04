import Link from "next/link"
import { LayoutDashboard, Users, CalendarDays, CheckSquare, Megaphone, Award, BarChart3, FileText, ShieldAlert, LogOut, Lock, Trophy } from "lucide-react"

export function OrganizerSidebar() {
  return (
    <div className="w-64 h-screen border-r border-white/10 bg-black/80 backdrop-blur-xl flex flex-col hidden md:flex sticky top-0">
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <Link href="/organizer" className="text-xl font-bold tracking-tighter text-white">
          ORG<span className="text-blue-500">PORTAL</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-4">Management</div>
        
        <Link href="/organizer" className="flex items-center gap-3 px-4 py-2.5 bg-blue-500/10 text-blue-400 rounded-xl transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium text-sm">Dashboard</span>
        </Link>
        
        <Link href="/organizer/events" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <CalendarDays className="w-5 h-5" />
          <span className="font-medium text-sm">Events</span>
        </Link>
        
        <Link href="/organizer/registrations" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <CheckSquare className="w-5 h-5" />
          <span className="font-medium text-sm">Registrations</span>
        </Link>
        
        <Link href="/organizer/attendance" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Users className="w-5 h-5" />
          <span className="font-medium text-sm">Attendance</span>
        </Link>

        <div className="mt-6 mb-4 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider pt-4 border-t border-white/5">Operations</div>

        <Link href="/organizer/announcements" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Megaphone className="w-5 h-5" />
          <span className="font-medium text-sm">Announcements</span>
        </Link>

        <Link href="/organizer/certificates" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Award className="w-5 h-5" />
          <span className="font-medium text-sm">Certificates</span>
        </Link>

        <div className="mt-6 mb-4 px-4 text-xs font-semibold text-red-400/60 uppercase tracking-wider pt-4 border-t border-white/5 flex items-center gap-2">
          <Lock className="w-3 h-3" /> Admin Only
        </div>

        <Link href="/organizer/analytics" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium text-sm">Analytics</span>
        </Link>

        <Link href="/organizer/leaderboard" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Trophy className="w-5 h-5 text-yellow-500/70" />
          <span className="font-medium text-sm text-yellow-500/70">Hidden PR Points</span>
        </Link>

        <Link href="/organizer/audit" className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <ShieldAlert className="w-5 h-5" />
          <span className="font-medium text-sm">Audit Logs</span>
        </Link>
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Exit Portal</span>
        </button>
      </div>
    </div>
  )
}
