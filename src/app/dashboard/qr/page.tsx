import { Card, CardContent } from "@/components/ui/Card"
import { QrCode, ShieldCheck } from "lucide-react"

export default function QRPassPage() {
  return (
    <div className="space-y-8 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Your Digital Pass</h1>
        <p className="text-white/60">Present this QR code to volunteers at the event venue for attendance.</p>
      </div>

      <Card className="w-full max-w-sm relative overflow-hidden bg-gradient-to-br from-primary/10 to-blue-900/20 border-primary/20">
        {/* Holographic effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 animate-pulse pointer-events-none" />
        
        <div className="p-8 flex flex-col items-center border-b border-white/10">
          <div className="w-48 h-48 bg-white p-4 rounded-xl flex items-center justify-center shadow-2xl shadow-primary/20 mb-6">
            <QrCode className="w-full h-full text-black" />
          </div>
          
          <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest uppercase text-sm mb-2">
            <ShieldCheck className="w-4 h-4" /> Active Pass
          </div>
        </div>

        <CardContent className="p-6 text-center bg-black/40">
          <h2 className="text-2xl font-bold text-white mb-1">John Doe</h2>
          <p className="text-primary font-medium mb-4">23IT001 • CS Department</p>
          <div className="text-xs text-white/40 font-mono">
            ID: {Math.random().toString(36).substring(2, 12).toUpperCase()}
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-white/40 max-w-md text-center">
        This QR code is uniquely tied to your profile. Do not share this pass with anyone. It is strictly meant for your event check-ins.
      </p>
    </div>
  )
}
