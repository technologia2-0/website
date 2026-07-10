import { createClient } from "@/utils/supabase/server";
import { EventCard } from "@/components/dashboard/EventCard";
import { Calendar } from "lucide-react";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all events
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  // Fetch registered events for this user to pass the `isRegistered` flag
  // Assuming a table `registrations` links user_id to event_id
  const { data: registrations } = await supabase
    .from('registrations')
    .select('event_id')
    .eq('user_id', user?.id);

  const registeredEventIds = new Set(registrations?.map(r => r.event_id) || []);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            Events
          </h1>
          <p className="text-white/60">Discover and register for all competitions, workshops, and activities.</p>
        </div>
      </div>

      {eventsError || !events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Events Published Yet</h3>
          <p className="text-white/50 max-w-md mx-auto text-sm">
            The organizers haven't published any events for this edition yet. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              category={event.event_type}
              date={event.date}
              time={event.time}
              venue={event.venue}
              isTeam={event.is_team_event}
              teamSize={event.max_team_size}
              isOpen={event.is_registration_open}
              isRegistered={registeredEventIds.has(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
