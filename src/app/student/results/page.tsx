import { FileText } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
        <FileText className="w-10 h-10 text-green-400" />
      </div>
      <h1 className="text-3xl font-black text-white tracking-tight mb-3">Results Pending</h1>
      <p className="text-white/50 max-w-md mx-auto mb-8">
        Results for competitions have not been published yet. Check back here after the events conclude.
      </p>
      
      <Link href="/student" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">
        Return to Dashboard
      </Link>
    </div>
  )
}
