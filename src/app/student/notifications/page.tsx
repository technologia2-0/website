import { Bell, Megaphone, CalendarClock } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function NotificationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const { data: announcementsData } = await supabase
    .from('announcements')
    .select('*')
    .eq('publication_status', 'published')
    .order('created_at', { ascending: false })

  const announcements = announcementsData?.map(a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    time: new Date(a.created_at).toLocaleDateString(),
    type: a.priority
  })) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-500" />
          Notifications & Notices
        </h1>
        <p className="text-white/60">All official announcements and updates will appear here.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center py-12 text-white/50">
            <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No announcements published yet.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${announcement.type === 'urgent' ? 'bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-blue-500/10 text-blue-400'}`}>
                <Megaphone className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                  {announcement.type === 'urgent' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 shrink-0 hidden sm:block">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-sm mb-3 whitespace-pre-wrap">
                  {announcement.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <CalendarClock className="w-4 h-4" />
                  {announcement.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
