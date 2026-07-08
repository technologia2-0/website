'use client'

import { Trophy, Eye, EyeOff, BarChart3, AlertCircle } from 'lucide-react'

export default function ResultsManagerPage() {
  const isRevealed = false // This would normally be fetched from `edition_settings`

  const rankings = [
    { rank: 1, dept: 'Computer Science', points: 1450, color: 'text-amber-400' },
    { rank: 2, dept: 'Information Technology', points: 1220, color: 'text-slate-400' },
    { rank: 3, dept: 'Data Science', points: 980, color: 'text-amber-600' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-white tracking-tight">PR Points & Results</h1>
            {!isRevealed && (
              <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <EyeOff className="w-3 h-3" /> Hidden from Public
              </span>
            )}
          </div>
          <p className="text-white/60">Manage manual points and trigger the Grand Reveal on Live Display.</p>
        </div>
        
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center gap-2 group">
          <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" /> Trigger Grand Reveal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Current Standings</h2>
            </div>

            <div className="space-y-4">
              {rankings.map((team, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 group-hover:bg-primary transition-colors" />
                  
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-xl text-white/50">
                    #{team.rank}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white mb-1">{team.dept}</h3>
                    <div className="text-sm text-white/40">45 Participants • 12 Events Won</div>
                  </div>

                  <div className="text-right">
                    <div className={`text-3xl font-black tabular-nums ${team.color}`}>
                      {team.points}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white/30">PR Points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manual Adjustments Panel */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Manual Adjustments</h2>
            </div>
            
            <p className="text-sm text-white/50 mb-6">Use this to award bonus points for discipline, special mentions, or deduct points for violations.</p>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Department</label>
                <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Data Science</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Operation</label>
                  <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="add">Add (+)</option>
                    <option value="deduct">Deduct (-)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Points</label>
                  <input type="number" defaultValue={0} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Reason (Audit Log)</label>
                <input type="text" placeholder="e.g. Disciplinary deduction" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <button type="button" className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors mt-2">
                Apply Adjustment
              </button>
            </form>
          </div>

          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-400/80 leading-relaxed">
              <strong>Warning:</strong> Point adjustments are logged and tracked via the Audit Log. Changes cannot be silently reverted.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
