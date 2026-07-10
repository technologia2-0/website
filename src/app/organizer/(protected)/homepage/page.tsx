import { createClient } from "@/utils/supabase/server"
import { HomepageEditorClient } from "@/components/organizer/HomepageEditorClient"

export default async function HomepageContentPage() {
  const supabase = await createClient()

  // Ensure row 1 exists or return defaults (though migration handles this)
  const { data: content } = await supabase
    .from('homepage_content')
    .select('*')
    .eq('id', 1)
    .single()

  const defaultContent = {
    hero_title: 'THE FUTURE OF INNOVATION',
    hero_subtitle: `Technologia Edition`,
    hero_description: 'Join the ultimate technical fest. Experience cutting-edge competitions, hands-on workshops, and prove your department\'s supremacy.',
    countdown_date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    about_title: 'About Technologia',
    about_description: 'Technologia is the premier annual technical festival...',
    vision_text: 'To foster a culture of technical excellence and innovation among students.',
    mission_text: 'To provide a platform for students to showcase their skills, learn from experts, and collaborate on real-world problems.'
  }

  return <HomepageEditorClient content={content || defaultContent} />
}
