"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers } from "lucide-react";
import { useState, useEffect } from "react";

export function LandingNavbar({ year }: { year: number }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  return (
    <motion.nav
      style={{ backgroundColor: navBackground, borderColor: navBorder }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b flex items-center justify-between px-6 md:px-12 h-20 ${
        isScrolled ? "backdrop-blur-lg" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          TECH<span className="text-accent-blue">NOLOGIA</span>
        </Link>
        <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded-full font-medium ml-2 tracking-normal hidden sm:flex items-center gap-1">
          <Layers className="w-3 h-3" /> {year}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-text">
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
        <Link href="#journey" className="hover:text-white transition-colors">Journey</Link>
        <Link href="#departments" className="hover:text-white transition-colors">Departments</Link>
        <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="/login" 
          className="text-sm font-medium text-white hover:text-accent-blue transition-colors hidden sm:block"
        >
          Login
        </Link>
        <Link 
          href="/signup" 
          className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Register
        </Link>
      </div>
    </motion.nav>
  );
}
