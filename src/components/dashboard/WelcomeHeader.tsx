"use client";

interface WelcomeHeaderProps {
  fullName: string;
  department: string;
  initials: string;
}

export function WelcomeHeader({ fullName, department, initials }: WelcomeHeaderProps) {
  return (
    <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-5">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shrink-0">
        {initials}
      </div>
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          Welcome back, {fullName.split(' ')[0]} <span className="animate-wave inline-block origin-bottom-right">👋</span>
        </h1>
        <p className="text-white/50 text-xs md:text-sm mt-0.5">
          {department} • Technologia 2.0
        </p>
      </div>
    </div>
  );
}
