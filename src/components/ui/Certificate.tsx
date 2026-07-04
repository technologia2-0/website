import { Trophy } from "lucide-react"

export function Certificate({ 
  name, 
  event, 
  rank, 
  type 
}: { 
  name: string, 
  event: string, 
  rank: number | null,
  type: 'Winner' | 'Runner-up' | 'Participation' | 'Organizer'
}) {
  return (
    <div className="relative w-full max-w-4xl aspect-[1.414/1] bg-[#0a0a0a] border-[12px] border-double border-primary/30 p-12 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
      
      {/* Corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/50" />

      {/* Header */}
      <div className="text-primary tracking-[0.5em] text-sm font-bold uppercase mb-8">
        Technologia 2026
      </div>
      
      <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 uppercase tracking-widest" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
        Certificate
      </h1>
      
      <div className="text-xl text-primary font-medium tracking-widest uppercase mb-12">
        of {type}
      </div>

      <div className="text-white/60 mb-6">This is to certify that</div>
      
      <div className="text-4xl md:text-5xl font-bold text-white mb-6 border-b border-white/20 pb-4 px-12 inline-block">
        {name}
      </div>

      <div className="text-white/60 mb-6 max-w-lg leading-relaxed">
        has successfully participated and secured <strong className="text-primary">{rank ? `Rank ${rank}` : 'participation'}</strong> in the event
      </div>
      
      <div className="text-3xl font-bold text-white tracking-widest uppercase mb-16">
        {event}
      </div>

      {/* Signatures */}
      <div className="absolute bottom-16 left-24 text-center">
        <div className="w-32 border-b border-white/30 mb-2"></div>
        <div className="text-xs text-white/50 uppercase tracking-widest">Faculty Head</div>
      </div>
      
      <div className="absolute bottom-16 right-24 text-center">
        <div className="w-32 border-b border-white/30 mb-2"></div>
        <div className="text-xs text-white/50 uppercase tracking-widest">Fest Convenor</div>
      </div>

      {/* Badge */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-900/40 border border-primary/50 flex items-center justify-center flex-col">
        <Trophy className="w-8 h-8 text-primary mb-1" />
        <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Verified</span>
      </div>
    </div>
  )
}
