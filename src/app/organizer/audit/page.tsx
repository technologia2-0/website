import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Shield } from "lucide-react"

export default function AuditLogsPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Audit Logs
          </h1>
          <p className="text-white/60">Review security logs and administrative actions.</p>
        </div>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl text-white">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">We're building this feature</h3>
            <p className="text-white/50 max-w-md mx-auto">
              This section is currently under development. Stay tuned for exciting updates as we prepare for the ultimate technical fest.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
