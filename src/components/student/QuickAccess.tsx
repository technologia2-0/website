import Link from "next/link";
import { Calendar, QrCode, Award, FileText, User } from "lucide-react";

export function QuickAccess() {
  const shortcuts = [
    { href: "/student/events", label: "Browse Events", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { href: "/student/qr", label: "QR Pass", icon: QrCode, color: "text-blue-400", bg: "bg-blue-500/10" },
    { href: "/student/certificates", label: "Certificates", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { href: "/student/results", label: "Results", icon: FileText, color: "text-green-400", bg: "bg-green-500/10" },
    { href: "/student/profile", label: "Profile", icon: User, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4 px-2">Quick Access</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {shortcuts.map((shortcut, i) => {
          const Icon = shortcut.icon;
          return (
            <Link 
              key={i} 
              href={shortcut.href}
              className="bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group"
            >
              <div className={`w-12 h-12 rounded-full ${shortcut.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${shortcut.color}`} />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">{shortcut.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
