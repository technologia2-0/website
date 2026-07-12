import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users, Info, ShieldAlert, Trophy, LayoutGrid, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch event details
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !event) {
    notFound();
  }

  // Check registration
  const { data: registration } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', user.id)
    .eq('event_id', event.id)
    .single();

  const isRegistered = !!registration;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/student/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        {/* Banner */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-blue-900/40 to-purple-900/40 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/10">
              {event.event_type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/5 pb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{event.title}</h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                {event.description}
              </p>
            </div>
            
            <div className="shrink-0 w-full md:w-auto flex flex-col gap-3">
              {isRegistered ? (
                <Link 
                  href="/student/my-events"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5" /> You are Registered
                </Link>
              ) : event.is_registration_open ? (
                <button className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Register for Event
                </button>
              ) : (
                <button disabled className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 text-white/30 font-bold border border-white/10 cursor-not-allowed">
                  Registration Closed
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-start gap-4">
              <Calendar className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Date & Time</h4>
                <p className="text-sm text-gray-400">{event.date || 'TBA'}</p>
                <p className="text-sm text-gray-400">{event.time || 'TBA'}</p>
              </div>
            </div>
            
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Venue</h4>
                <p className="text-sm text-gray-400">{event.venue || 'TBA'}</p>
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-start gap-4">
              <Users className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Team Size</h4>
                <p className="text-sm text-gray-400">
                  {event.is_team_event ? `Max ${event.max_team_size} Members` : 'Individual Event'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" /> Rules & Guidelines
              </h3>
              <div className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed">
                <p>Specific event rules and eligibility criteria will be displayed here as provided by the organizers. Make sure to read everything carefully before the event day.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-300">
                  <li>Participants must arrive 15 minutes before the start time.</li>
                  <li>Show your QR Pass at the venue entrance.</li>
                  <li>Decision of the judges will be final and binding.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" /> Prizes & Recognition
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">🥇</div>
                  <div className="text-sm font-semibold text-white mb-1">Winner</div>
                  <div className="text-xs text-yellow-500/70">Certificate of Merit</div>
                </div>
                <div className="flex-1 bg-gray-500/10 border border-gray-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-400 mb-1">🥈</div>
                  <div className="text-sm font-semibold text-white mb-1">Runner Up</div>
                  <div className="text-xs text-gray-500/70">Certificate of Merit</div>
                </div>
                <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">📜</div>
                  <div className="text-sm font-semibold text-white mb-1">Participation</div>
                  <div className="text-xs text-blue-500/70">For all attendees</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <ShieldAlert className="w-5 h-5 text-orange-400" /> Contact Coordinators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="font-semibold text-white">Event Head</div>
                  <div className="text-sm text-gray-400">Available at Venue</div>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="font-semibold text-white">Faculty Coordinator</div>
                  <div className="text-sm text-gray-400">TBD</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
