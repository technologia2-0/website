import Link from "next/link";
import { CalendarIcon, MapPin, Users, CheckCircle2 } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  isTeam: boolean;
  teamSize: number;
  isOpen: boolean;
  isRegistered: boolean;
}

export function EventCard({
  id, title, category, date, time, venue, isTeam, teamSize, isOpen, isRegistered
}: EventCardProps) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-colors">
      <div className="h-32 bg-gradient-to-br from-blue-900/40 to-purple-900/40 relative">
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/10">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:text-accent-blue transition-colors">{title}</h3>
        
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <CalendarIcon className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">{date || 'TBA'} • {time || 'TBA'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate">{venue || 'TBA'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isTeam ? `Team of ${teamSize}` : 'Individual'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          <Link 
            href={`/student/events/${id}`}
            className="flex-1 text-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10"
          >
            View Details
          </Link>
          
          {isRegistered ? (
            <Link 
              href={`/student/my-events`}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 font-medium text-sm border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" /> Registered
            </Link>
          ) : isOpen ? (
            <Link 
              href={`/student/events/${id}?action=register`}
              className="flex-1 text-center py-2 rounded-xl bg-white text-black hover:bg-gray-200 font-semibold text-sm transition-colors"
            >
              Register
            </Link>
          ) : (
            <button 
              disabled
              className="flex-1 text-center py-2 rounded-xl bg-white/5 text-white/30 font-medium text-sm cursor-not-allowed"
            >
              Closed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
