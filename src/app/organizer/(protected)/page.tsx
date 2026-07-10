import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, CheckSquare, CalendarDays, Award, AlertCircle } from "lucide-react"

export default function OrganizerDashboard() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Organizer Dashboard</h1>
          <p className="text-white/60">Overview of today's events, registrations, and fest operations.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium text-white/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
          Day 1: Ongoing
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60 flex items-center justify-between">
              Total Registrations
              <Users className="w-4 h-4 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">1,248</div>
            <p className="text-xs text-blue-400 font-medium">+142 today</p>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60 flex items-center justify-between">
              Pending Approvals
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">56</div>
            <p className="text-xs text-emerald-400 font-medium">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/5 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60 flex items-center justify-between">
              Today's Events
              <CalendarDays className="w-4 h-4 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">8</div>
            <p className="text-xs text-purple-400 font-medium">3 currently live</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60 flex items-center justify-between">
              Certificates Issued
              <Award className="w-4 h-4 text-orange-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">420</div>
            <p className="text-xs text-orange-400 font-medium">Across all roles</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1 border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alice Smith", event: "Code Genesis", status: "Pending", time: "2 mins ago" },
                { name: "Bob Johnson", event: "Hack the Box", status: "Approved", time: "15 mins ago" },
                { name: "Team Alpha", event: "System Design", status: "Pending", time: "1 hour ago" },
                { name: "Charlie Davis", event: "TypeRacer Pro", status: "Approved", time: "2 hours ago" },
              ].map((reg, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                  <div>
                    <div className="font-medium text-white text-sm">{reg.name}</div>
                    <div className="text-xs text-white/50">{reg.event}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                      reg.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {reg.status}
                    </span>
                    <div className="text-[10px] text-white/40 mt-1">{reg.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" /> Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <h4 className="font-semibold text-yellow-500 mb-1">Verify Results for Code Genesis</h4>
                <p className="text-sm text-yellow-500/80 mb-3">Coordinator has submitted results for Round 1. Admin verification required to lock and distribute PR points.</p>
                <button className="text-xs font-bold text-black bg-yellow-500 px-3 py-1.5 rounded-md hover:bg-yellow-400 transition-colors">
                  Review Results
                </button>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-blue-400 mb-1">Approve Team "ByteMe"</h4>
                <p className="text-sm text-blue-400/80 mb-3">Team registration limit is approaching for Hack the Box. Review pending team.</p>
                <button className="text-xs font-bold text-black bg-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-300 transition-colors">
                  View Team
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
