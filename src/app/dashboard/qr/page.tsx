import { QrCode, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function QRPassPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
        <QrCode className="w-10 h-10 text-blue-400" />
      </div>
      <h1 className="text-3xl font-black text-white tracking-tight mb-3">QR Pass Unavailable</h1>
      <p className="text-white/50 max-w-md mx-auto mb-8">
        Your QR Pass will be generated 24 hours before the fest begins. Please ensure your profile is fully updated before then.
      </p>
      
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">
          Return to Dashboard
        </Link>
        <Link href="/dashboard/profile" className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          Update Profile
        </Link>
      </div>
    </div>
  )
}
