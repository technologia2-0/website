import { createClient } from "@/utils/supabase/server"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { TodaysTimeline } from "@/components/dashboard/TodaysTimeline"
import { RegisteredEvents } from "@/components/dashboard/RegisteredEvents"
import { LiveAnnouncements } from "@/components/dashboard/LiveAnnouncements"

export default async function DashboardOverview() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const fullName = user?.user_metadata?.full_name || "User"
  const department = user?.user_metadata?.department || ""
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <WelcomeHeader 
        fullName={fullName} 
        department={department} 
        initials={initials} 
      />
      
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full inline-block" />
          Quick Actions
        </h2>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <TodaysTimeline />
        </div>
        <div className="space-y-6">
          <LiveAnnouncements />
        </div>
      </div>

      <RegisteredEvents />
    </div>
  )
}
