'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, CalendarDays, Megaphone, Award, BarChart3, ShieldAlert, LogOut, Lock, Trophy, Layers, Settings, Image, Briefcase, Shield } from "lucide-react"
import { logout } from "@/app/login/actions"

const navItems = [
  {
    section: "Management",
    links: [
      { href: "/organizer", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/organizer/events", label: "Events", icon: CalendarDays },
      { href: "/organizer/users", label: "Users & Teams", icon: Users },
    ]
  },
  {
    section: "Operations",
    links: [
      { href: "/organizer/announcements", label: "Announcements", icon: Megaphone },
      { href: "/organizer/certificates", label: "Certificates", icon: Award },
      { href: "/organizer/committee", label: "Committee", icon: Users },
      { href: "/organizer/sponsors", label: "Sponsors", icon: Briefcase },
      { href: "/organizer/gallery", label: "Gallery", icon: Image },
    ]
  },
  {
    section: "Admin Only",
    adminSection: true,
    links: [
      { href: "/organizer/homepage", label: "Homepage Content", icon: Layers },
      { href: "/organizer/history", label: "Technologia History", icon: Layers },
      { href: "/organizer/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/organizer/leaderboard", label: "Hidden PR Points", icon: Trophy, special: "yellow" },
      { href: "/organizer/audit", label: "Audit Logs", icon: ShieldAlert },
      { href: "/organizer/settings", label: "Global Settings", icon: Settings },
    ]
  }
]

export function OrganizerSidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="w-64 h-screen border-r border-white/10 bg-black/80 backdrop-blur-xl flex flex-col hidden md:flex sticky top-0">
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <Link href="/organizer" className="text-xl font-bold tracking-tighter text-white">
          ORG<span className="text-blue-500">PORTAL</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-2" : ""}>
            {/* Section Header */}
            <div className={`${gi > 0 ? "mt-6 pt-4 border-t border-white/5" : ""} mb-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${group.adminSection ? "text-red-400/60" : "text-white/40"}`}>
              {group.adminSection && <Lock className="w-3 h-3" />}
              {group.section}
            </div>

            {/* Links */}
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const active = isActive(link.href, link.exact)
                const Icon = link.icon
                const isYellow = link.special === "yellow"

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 group
                      ${active
                        ? "bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                        : isYellow
                          ? "text-yellow-500/70 hover:text-yellow-400 hover:bg-yellow-500/10"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? "text-blue-400" : isYellow ? "text-yellow-500/70" : ""}`} />
                    <span className={`font-medium text-sm ${active ? "font-semibold" : ""}`}>
                      {link.label}
                    </span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button onClick={() => logout()} className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Exit Portal</span>
        </button>
      </div>
    </div>
  )
}
