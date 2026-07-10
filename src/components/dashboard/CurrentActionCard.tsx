"use client";

import { ArrowRight, AlertCircle, CalendarClock, QrCode } from "lucide-react";
import Link from "next/link";

interface CurrentActionCardProps {
  registeredEvents: any[];
}

export function CurrentActionCard({ registeredEvents }: CurrentActionCardProps) {
  // Simple logic to determine state
  const hasEvents = registeredEvents.length > 0;
  
  if (hasEvents) {
    // If they have events, assume the first one is the "Next" event for demonstration purposes
    const nextEvent = registeredEvents[0];
    return (
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-5 md:p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
              <CalendarClock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Your next event is approaching</h3>
              <p className="text-sm text-blue-200/70">
                {nextEvent.title} is scheduled for {nextEvent.time || 'TBA'} at {nextEvent.venue || 'TBA'}.
              </p>
            </div>
          </div>
          
          <Link 
            href="/dashboard/qr"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Show QR Pass
            <QrCode className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Empty State Action
  return (
    <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-2xl p-5 md:p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
            <AlertCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">Welcome to the Fest!</h3>
            <p className="text-sm text-emerald-200/70">
              You haven't registered for any events yet. Secure your spots before registration closes.
            </p>
          </div>
        </div>
        
        <Link 
          href="/dashboard/events"
          className="shrink-0 inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          Browse Events
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
