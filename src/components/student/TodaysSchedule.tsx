import { Clock, MapPin, CalendarDays } from "lucide-react";

interface TodaysScheduleProps {
  events: any[];
}

export function TodaysSchedule({ events }: TodaysScheduleProps) {
  // In a real app, we would filter by today's date.
  // For demonstration, we'll just take the first 3 events.
  const todaysEvents = events.slice(0, 3);

  if (todaysEvents.length === 0) {
    return null; // Don't show the widget if there are no events today
  }

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-purple-400" />
          Today's Schedule
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="space-y-4">
        {todaysEvents.map((event, i) => (
          <div key={i} className="flex gap-4 items-start relative group">
            {/* Timeline Line */}
            {i !== todaysEvents.length - 1 && (
              <div className="absolute left-[19px] top-8 bottom-[-16px] w-[2px] bg-white/5 group-hover:bg-white/10 transition-colors" />
            )}
            
            {/* Time Column */}
            <div className="flex flex-col items-center mt-1 shrink-0 w-10">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] z-10" />
              <span className="text-[10px] font-bold text-purple-300 mt-2 whitespace-nowrap">
                {event.time || 'TBA'}
              </span>
            </div>
            
            {/* Event Details */}
            <div className="flex-1 bg-white/[0.01] hover:bg-white/[0.03] border border-transparent hover:border-white/5 p-3 rounded-xl transition-colors -mt-2">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-bold text-white text-sm">{event.title}</h4>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 shrink-0">
                  Upcoming
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                {event.venue || 'TBA'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
