import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";
import { Archive, Layers, AlertTriangle } from "lucide-react";

export default function ArchiveEditionPage({ params }: { params: { year: string } }) {
  // Mock fetch of old edition data
  const archivedEdition = { name: `Technologia ${params.year}`, year: params.year };

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Archive Warning Banner */}
      <div className="w-full bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-500 text-center py-2 text-sm font-bold flex items-center justify-center gap-2 relative z-[60]">
        <AlertTriangle className="w-4 h-4" /> You are viewing an archived edition of Technologia ({params.year}). Some features are read-only.
        <Link href="/" className="ml-4 underline hover:text-yellow-400">Return to Current Edition</Link>
      </div>

      {/* Navbar */}
      <nav className="w-full h-20 glass sticky top-0 z-50 flex items-center justify-between px-8 border-b border-white/10">
        <div className="text-2xl font-bold tracking-tighter text-white/50 flex items-center gap-2">
          TECH<span className="text-primary/50">NOLOGIA</span>
          <span className="text-xs px-2 py-0.5 bg-white/5 text-white/40 rounded-full font-medium ml-2 tracking-normal flex items-center gap-1">
            <Archive className="w-3 h-3" /> {archivedEdition.year}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#events" className="hover:text-white transition-colors">Events</Link>
          <Link href="/archive" className="text-white">Other Editions</Link>
        </div>
      </nav>

      {/* Wrapping the page in an opacity filter to signify it's archived visually */}
      <div className="opacity-80 grayscale-[20%] pointer-events-none">
        <HeroSection year={parseInt(archivedEdition.year)} />
        <AboutSection />
        <EventsSection />
      </div>
      
      <Footer />
    </div>
  );
}
