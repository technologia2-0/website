import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { Layers } from "lucide-react";

export default function Home() {
  // In a real implementation, we would fetch the 'active' edition from Supabase
  const activeEdition = { name: "Technologia 2026", year: 2026 };

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Navbar */}
      <nav className="w-full h-20 glass fixed top-0 z-50 flex items-center justify-between px-8">
        <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          TECH<span className="text-primary">NOLOGIA</span>
          <span className="text-xs px-2 py-0.5 bg-white/10 text-white/50 rounded-full font-medium ml-2 tracking-normal flex items-center gap-1">
            <Layers className="w-3 h-3" /> {activeEdition.year}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#events" className="hover:text-white transition-colors">Events</Link>
          <Link href="#schedule" className="hover:text-white transition-colors">Schedule</Link>
          <Link href="/archive" className="hover:text-white transition-colors">Past Editions</Link>
          <Link href="/login" className="hover:text-white transition-colors">Portal</Link>
        </div>
        <Link href="/signup" className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          Register Now
        </Link>
      </nav>

      <HeroSection />

      <AboutSection />
      <EventsSection />
      <ScheduleSection />
      <Footer />
    </div>
  );
}

