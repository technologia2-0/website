import { CalendarCheck, Clock, FileText, Award, Bell } from "lucide-react";

export function OverviewStats() {
  const stats = [
    { label: "Registered Events", value: "3", icon: CalendarCheck, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Upcoming Events", value: "1", icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Results Published", value: "2", icon: FileText, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Certificates", value: "1", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Unread Notices", value: "3", icon: Bell, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl flex flex-col justify-between h-28 hover:bg-white/[0.04] transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-white/50 text-[10px] font-bold tracking-wide uppercase leading-tight max-w-[70%]">{stat.label}</span>
              <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
          </div>
        )
      })}
    </div>
  );
}
