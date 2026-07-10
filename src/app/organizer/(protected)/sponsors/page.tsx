import { createClient } from "@/utils/supabase/server"
import { SponsorListClient } from "@/components/organizer/SponsorListClient"

export default async function SponsorsPage() {
  const supabase = await createClient()

  const { data: sponsorsData } = await supabase
    .from('sponsors')
    .select('*')
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  const sponsors = sponsorsData || []

  return <SponsorListClient initialSponsors={sponsors} />
}
