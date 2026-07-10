import { createClient } from "@/utils/supabase/server"
import { GalleryListClient } from "@/components/organizer/GalleryListClient"

export default async function GalleryPage() {
  const supabase = await createClient()

  // Fetch gallery items with category names
  const { data: itemsData } = await supabase
    .from('gallery_items')
    .select(`
      *,
      gallery_categories (name)
    `)
    .order('created_at', { ascending: false })

  // Fetch categories for dropdown
  const { data: categories } = await supabase
    .from('gallery_categories')
    .select('id, name')
    .order('name')

  // Fetch events for dropdown
  const { data: events } = await supabase
    .from('events')
    .select('title')
    .order('date', { ascending: false })

  const items = itemsData || []

  return (
    <GalleryListClient 
      initialItems={items} 
      categories={categories || []}
      events={events || []}
    />
  )
}
