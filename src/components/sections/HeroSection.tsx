"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[90vh] pt-32 pb-20 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Registrations are now open for 2026
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
          The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
            Technology is Here
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join the ultimate technical fest. Experience cutting-edge competitions, workshops, and prove your department's supremacy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#events" className="w-full sm:w-auto flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-semibold text-lg text-white transition-all hover:bg-white/10">
            Explore Events
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
