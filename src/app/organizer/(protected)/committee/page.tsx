import { createClient } from "@/utils/supabase/server"
import { CommitteeListClient } from "@/components/organizer/CommitteeListClient"

export default async function CommitteePage() {
  const supabase = await createClient()

  const { data: membersData } = await supabase
    .from('committee_members')
    .select('*')
    .order('priority', { ascending: false })
    .order('name', { ascending: true })

  const members = membersData || []

  return <CommitteeListClient initialMembers={members} />
}
