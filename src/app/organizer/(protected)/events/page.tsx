import { createClient } from '@/utils/supabase/server'
import { EventListClient } from '@/components/organizer/EventListClient'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EventManagerPage() {
  const supabase = await createClient()

  // Get active edition
  const { data: edition } = await supabase
    .from('editions')
    .select('id')
    .eq('status', 'active')
    .single()

  if (!edition) {
    return (
      <div className="p-8 text-center bg-white/5 border border-white/10 rounded-3xl">
        <h2 className="text-xl font-bold text-white mb-2">No Active Edition</h2>
        <p className="text-white/60">Please create and activate a Fest Edition before managing events.</p>
      </div>
    )
  }

  // Fetch events for active edition
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('edition_id', edition.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching events:", error)
  }

  // In a real scenario, we might want to also fetch registration counts.
  // For now, we will map the events and add registered_count = 0 
  // until we have a proper view or join.
  const eventsWithCounts = (events || []).map(event => ({
    ...event,
    registered_count: 0 // Mocking registered count for now
  }))

  return <EventListClient initialEvents={eventsWithCounts} />
}
