import { createClient } from "@/utils/supabase/server"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { CurrentActionCard } from "@/components/dashboard/CurrentActionCard"
import { LiveAnnouncements } from "@/components/dashboard/LiveAnnouncements"
import { TodaysSchedule } from "@/components/dashboard/TodaysSchedule"
import { OverviewStats } from "@/components/dashboard/OverviewStats"
import { QuickAccess } from "@/components/dashboard/QuickAccess"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Users, ArrowRight, Ticket, ArrowUpRight } from "lucide-react"

export default async function DashboardOverview() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const fullName = user?.user_metadata?.full_name || "User"
  const department = user?.user_metadata?.department || ""
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

  // Fetch registrations with event details
  const { data: registrations, error } = await supabase
    .from('registrations')
    .select(`
      *,
      events (*)
    `)
    .eq('user_id', user.id);

  const registeredEvents = registrations?.map(r => r.events) || [];

  // Fetch Live Announcements
  const { data: announcementsData } = await supabase
    .from('announcements')
    .select('*')
    .eq('publication_status', 'published')
    .order('created_at', { ascending: false })
    .limit(5);

  const announcements = announcementsData?.map(a => ({
    id: a.id,
    title: a.title,
    time: new Date(a.created_at).toLocaleDateString(),
    type: a.priority
  })) || [];

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* 1. Welcome Section */}
      <WelcomeHeader 
        fullName={fullName} 
        department={department} 
        initials={initials} 
      />
      
      {/* 2. Current Action Card (Most Important) */}
      <CurrentActionCard registeredEvents={registeredEvents} />
      
      {/* 3. Today's Schedule */}
      <TodaysSchedule events={registeredEvents} />
      
      {/* 4. Quick Stats */}
      <OverviewStats />
      
      {/* 5. Announcements */}
      <LiveAnnouncements announcements={announcements} />
      
      {/* 6. My Registered Events */}
      <div className="pt-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4 px-1">
          <Ticket className="w-5 h-5 text-emerald-500" />
          My Registered Events
        </h2>

        {error || registeredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <h3 className="text-2xl font-black text-white mb-2">No Events Registered Yet</h3>
            <p className="text-white/50 text-sm mb-8 max-w-md">
              Browse available events and register to begin your Technologia journey. Don't miss out on the action!
            </p>
            <Link 
              href="/dashboard/events" 
              className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {registeredEvents.map((event: any) => (
              <div key={event.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-white/[0.04] transition-colors">
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Registered
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/10 truncate">
                      {event.event_type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 truncate">{event.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      {event.venue}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                  {event.is_team_event && (
                    <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition-colors text-center">
                      View Team
                    </button>
                  )}
                  <Link 
                    href={`/dashboard/events/${event.id}`}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-semibold text-sm transition-colors"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. Quick Access */}
      <div className="pt-8">
        <QuickAccess />
      </div>

    </div>
  )
}
