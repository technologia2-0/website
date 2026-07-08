import { Trophy, Medal, Award, Search, Filter } from 'lucide-react'
import Link from 'next/link'

const results = [
  { event: 'Hackathon: Code Genesis', position: '1st Place', points: 100, date: 'Oct 25, 2026', type: 'Winner', color: 'from-amber-300 to-yellow-600', icon: Trophy, medalColor: 'text-yellow-400' },
  { event: 'Tech Quiz', position: 'Participation', points: 10, date: 'Oct 24, 2026', type: 'Participation', color: 'from-slate-400 to-slate-600', icon: Award, medalColor: 'text-slate-400' },
  { event: 'Web Dev Challenge', position: '3rd Place', points: 20, date: 'Oct 26, 2026', type: 'Winner', color: 'from-amber-700 to-orange-900', icon: Medal, medalColor: 'text-amber-600' },
]

export default function ResultsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Results & Standings</h1>
          <p className="text-white/60">View official results for completed events.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search events..."
              className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-sm w-full sm:w-64"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, i) => {
          const Icon = result.icon
          const isWinner = result.type === 'Winner'
          
          return (
            <div key={i} className={`relative rounded-3xl p-6 overflow-hidden ${isWinner ? 'bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10' : 'bg-white/[0.02] border border-white/5'}`}>
              {isWinner && (
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${result.color} blur-[50px] opacity-20 pointer-events-none`} />
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isWinner ? 'bg-white/10 shadow-inner' : 'bg-white/5'}`}>
                  <Icon className={`w-6 h-6 ${result.medalColor}`} />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isWinner ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                  {result.position}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{result.event}</h3>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="text-sm">
                    <span className="text-white/40 block text-xs uppercase tracking-wider font-semibold mb-1">Points</span>
                    <span className="text-white font-bold">+{result.points} PR</span>
                  </div>
                  <div className="text-sm text-right">
                    <span className="text-white/40 block text-xs uppercase tracking-wider font-semibold mb-1">Declared On</span>
                    <span className="text-white/80 font-medium">{result.date}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Locked Results */}
        <div className="relative rounded-3xl p-6 bg-white/[0.01] border border-white/5 border-dashed flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-white/20" />
          </div>
          <h3 className="font-bold text-white mb-1">RoboWars</h3>
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Results Pending</p>
        </div>
      </div>
      
      <div className="flex justify-center pt-8 border-t border-white/5">
        <Link href="/dashboard/leaderboard" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10">
          View Global Leaderboard
        </Link>
      </div>
    </div>
  )
}
