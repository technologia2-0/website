"use client";

import { Megaphone, CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";

export function LiveAnnouncements({ announcements = [] }: { announcements?: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (announcements.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!announcements || announcements.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-950/20 to-transparent border border-blue-500/20 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
          <Megaphone className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">No new announcements</h4>
          <p className="text-[10px] text-blue-200/50 mt-0.5">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-950/20 to-transparent border border-blue-500/20 rounded-2xl p-4 flex items-center gap-4 overflow-hidden relative">
      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 z-10">
        <Megaphone className="w-5 h-5 text-blue-400" />
      </div>
      
      <div className="flex-1 min-w-0 relative h-10 z-10">
        {announcements.map((announcement, idx) => (
          <div 
            key={announcement.id}
            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
              idx === currentIndex 
                ? "opacity-100 translate-y-0" 
                : idx < currentIndex 
                  ? "opacity-0 -translate-y-4 pointer-events-none" 
                  : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-2">
              {announcement.type === 'urgent' && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              )}
              <h4 className="text-white font-bold text-sm truncate">{announcement.title}</h4>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-blue-200/50 mt-0.5">
              <CalendarClock className="w-3 h-3" />
              {announcement.time}
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots Indicator */}
      <div className="hidden sm:flex items-center gap-1.5 z-10">
        {announcements.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-4 bg-blue-400" : "w-1.5 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
