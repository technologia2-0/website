import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="w-full h-16 glass sticky top-0 z-50 flex items-center justify-between px-8 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold tracking-tighter text-white">TECH<span className="text-primary">NOLOGIA</span></div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-white/60">Participant Portal</div>
        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-xs">
          U
        </div>
      </div>
    </nav>
  )
}
