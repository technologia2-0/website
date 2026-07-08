import Link from "next/link"
import { ArrowLeft, Share2, LogOut } from "lucide-react"
import { EventTabs } from "@/components/dashboard/EventTabs"

// Note: In Next.js 15+, dynamic route params must be awaited. 
// e.g. const { id } = await params
export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // In a real app, fetch event data using this ID.
  const eventTitle = id === '1' ? 'Hackathon: Code Genesis' : 'Event Details'

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="relative overflow-hidden rounded-3xl bg-black border border-white/10">
        <div className="h-48 w-full bg-gradient-to-r from-blue-600/40 to-purple-600/40 relative">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        
        <div className="relative z-10 p-8 -mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider">
                  Registration Approved
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  Team Event
                </span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">{eventTitle}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold transition-colors border border-red-500/20">
                <LogOut className="w-4 h-4" /> Withdraw
              </button>
            </div>
          </div>

          <EventTabs />
        </div>
      </div>
    </div>
  )
}
