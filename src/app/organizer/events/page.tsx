import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Plus, Search, Edit2, Trash2, Users } from "lucide-react"

export default function EventManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Event Management</h1>
          <p className="text-white/60">Create, edit, and manage fest events.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Create Event
        </Button>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <CardTitle>All Events</CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input placeholder="Search events..." className="pl-9 h-9 bg-black/40" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white/40 uppercase bg-white/[0.02] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium">Event Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Registrations</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Code Genesis", cat: "Technical", type: "Individual", reg: "245/300", status: "Open" },
                  { name: "Hack the Box", cat: "Cybersecurity", type: "Team (Max 4)", reg: "32/50 Teams", status: "Open" },
                  { name: "Bug Bash", cat: "Debugging", type: "Individual", reg: "150/150", status: "Closed" },
                  { name: "System Design", cat: "Architecture", type: "Team (Max 2)", reg: "40/100 Teams", status: "Open" },
                ].map((event, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{event.name}</td>
                    <td className="px-6 py-4 text-white/60">{event.cat}</td>
                    <td className="px-6 py-4 text-white/60">{event.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="w-4 h-4 text-primary" /> {event.reg}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-white/40 hover:text-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-white/40 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
