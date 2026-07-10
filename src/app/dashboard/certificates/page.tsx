import { Award } from "lucide-react";
import Link from "next/link";

export default function CertificatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-yellow-500/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,179,8,0.15)]">
        <Award className="w-10 h-10 text-yellow-400" />
      </div>
      <h1 className="text-3xl font-black text-white tracking-tight mb-3">No Certificates Yet</h1>
      <p className="text-white/50 max-w-md mx-auto mb-8">
        Certificates will be distributed digitally here after the conclusion of the fest and verification of your attendance.
      </p>
      
      <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">
        Return to Dashboard
      </Link>
    </div>
  )
}
