import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Trophy, TrendingUp, Medal } from "lucide-react"

export default function LeaderboardPage() {
  const leaderboards = [
    { dept: "Information Technology", points: 1450, rank: 1, trend: "+120", recentWin: "Code Genesis" },
    { dept: "Computer Science", points: 1240, rank: 2, trend: "+50", recentWin: "Hack the Box" },
    { dept: "Data Science", points: 890, rank: 3, trend: "+20", recentWin: "Data Viz" },
  ]

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">PR Points Leaderboard</h1>
        <p className="text-white/60">Live standings for the Best Department Trophy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboards.map((dept, i) => (
          <Card key={i} className={`relative overflow-hidden ${
            dept.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/10' : 
            dept.rank === 2 ? 'border-gray-400/50 bg-gray-400/10' : 
            'border-amber-700/50 bg-amber-700/10'
          }`}>
            {dept.rank === 1 && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-[50px] pointer-events-none" />
            )}
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  dept.rank === 1 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 
                  dept.rank === 2 ? 'bg-gray-300 text-black' : 
                  'bg-amber-600 text-white'
                }`}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white/60 uppercase tracking-wider mb-1">Rank</div>
                  <div className="text-3xl font-black text-white">#{dept.rank}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{dept.dept}</h3>
              <div className="flex items-center justify-between mt-4">
                <div className="text-3xl font-black text-white">
                  {dept.points.toLocaleString()} <span className="text-sm font-medium text-white/40 uppercase tracking-widest">PTS</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3" /> {dept.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Recent Point Distributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { event: "Code Genesis", name: "Alice Smith", dept: "IT", points: "+50", rank: "1st Place", time: "10 mins ago" },
              { event: "Hack the Box", name: "Team ByteMe", dept: "CS", points: "+50", rank: "1st Place", time: "1 hour ago" },
              { event: "Bug Bash", name: "Charlie Davis", dept: "IT", points: "+30", rank: "2nd Place", time: "2 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Medal className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">{activity.event}</h4>
                    <p className="text-sm text-white/60">{activity.name} • <span className="text-primary">{activity.rank}</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80 font-medium">
                      {activity.dept} Dept
                    </span>
                    <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      {activity.points}
                    </span>
                  </div>
                  <div className="text-[10px] text-white/40">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
