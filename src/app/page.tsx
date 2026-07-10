import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technologia | Official Technical Fest',
  description: 'The premier technical fest bringing together the brightest minds from Information Technology, Computer Science, and Data Science. Join the revolution.',
  openGraph: {
    title: 'Technologia | Official Technical Fest',
    description: 'The premier technical fest. 100% automated, fully digital, and extremely competitive.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technologia | Official Technical Fest',
    description: 'The premier technical fest. 100% automated, fully digital, and extremely competitive.',
  }
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();

  // Fetch homepage content
  const { data: content } = await supabase
    .from('homepage_content')
    .select('*')
    .eq('id', 1)
    .single();

  const activeYear = new Date().getFullYear();
  
  // Default values if table is empty
  const defaultContent = {
    hero_title: 'THE FUTURE OF INNOVATION',
    hero_subtitle: `Technologia ${activeYear} Edition`,
    hero_description: 'Join the ultimate technical fest. Experience cutting-edge competitions, hands-on workshops, and prove your department\'s supremacy.',
    countdown_date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    about_title: 'About Technologia',
    about_description: 'Technologia is the premier annual technical festival...',
    vision_text: 'To foster a culture of technical excellence and innovation among students.',
    mission_text: 'To provide a platform for students to showcase their skills, learn from experts, and collaborate on real-world problems.'
  };

  const pageContent = content || defaultContent;

  return (
    <div className="flex flex-col min-h-screen scroll-smooth bg-black text-white font-sans selection:bg-accent-blue selection:text-black">
      <LandingNavbar year={activeYear} />
      <HeroSection 
        title={pageContent.hero_title}
        subtitle={pageContent.hero_subtitle}
        description={pageContent.hero_description}
        startDate={pageContent.countdown_date} 
      />
      <AboutSection 
        title={pageContent.about_title}
        description={pageContent.about_description}
        vision={pageContent.vision_text}
        mission={pageContent.mission_text}
      />
      <JourneySection />
      <DepartmentsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
