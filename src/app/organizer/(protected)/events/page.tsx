import { createClient } from '@/utils/supabase/server'
import { EventListClient } from '@/components/organizer/EventListClient'

export const dynamic = 'force-dynamic'

export default async function EventManagerPage() {
  const supabase = await createClient()

  // Fetch ALL events — no edition dependency
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching events:", error)
  }

  const eventsWithCounts = (events || []).map(event => ({
    ...event,
    registered_count: 0
  }))

  return <EventListClient initialEvents={eventsWithCounts} />
}
