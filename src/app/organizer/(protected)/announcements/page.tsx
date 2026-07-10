import { createClient } from "@/utils/supabase/server"
import { AnnouncementListClient } from "@/components/organizer/AnnouncementListClient"

export default async function AnnouncementsPage() {
  const supabase = await createClient()

  const { data: announcementsData } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  const announcements = announcementsData || []

  return <AnnouncementListClient initialAnnouncements={announcements} />
}
