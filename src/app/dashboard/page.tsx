import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Trophy, Code, CalendarDays, QrCode } from "lucide-react"
import Link from "next/link"

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back, John</h1>
          <p className="text-white/60">Here's what's happening with your fest registration today.</p>
        </div>
        <Link href="/dashboard/events">
          <Button variant="default">
            Explore More Events <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/20 to-blue-600/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white/80 flex items-center justify-between">
              PR Points
              <Trophy className="w-5 h-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">120</div>
            <p className="text-sm text-primary font-medium">Rank #14 in CS Dept</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white/80 flex items-center justify-between">
              Registered Events
              <Code className="w-5 h-5 text-emerald-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">3</div>
            <p className="text-sm text-white/40">2 upcoming, 1 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white/80 flex items-center justify-between">
              Digital Pass
              <QrCode className="w-5 h-5 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-white mb-1">Active</div>
              <p className="text-sm text-white/40">Ready for scanning</p>
            </div>
            <Link href="/dashboard/qr">
              <Button variant="outline" size="sm" className="rounded-lg">
                View Pass
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - My Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Your Schedule</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Code Genesis (Round 1)", time: "Tomorrow, 11:00 AM", status: "Upcoming", type: "Individual" },
              { title: "Hack the Box", time: "March 16, 02:00 PM", status: "Upcoming", type: "Team" },
            ].map((event, i) => (
              <Card key={i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-sm text-white/50">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium text-white/70">
                    {event.type}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold">
                    {event.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Area - Announcements */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Live Updates</h2>
          <Card>
            <div className="divide-y divide-white/10">
              {[
                { title: "Results Announced for Bug Bash", time: "10 mins ago", isNew: true },
                { title: "Venue changed for TypeRacer Pro", time: "1 hour ago", isNew: true },
                { title: "Welcome to Technologia 2026", time: "1 day ago", isNew: false },
              ].map((update, i) => (
                <div key={i} className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-white/90 leading-tight">{update.title}</h4>
                    {update.isNew && (
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-white/40">{update.time}</p>
                </div>
              ))}
            </div>
            <CardContent className="pt-4 border-t border-white/10">
              <Button variant="ghost" className="w-full text-sm">
                See all notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
