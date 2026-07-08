import Link from "next/link"
import { ArrowLeft, Users, UserPlus, Crown, MoreVertical, LogOut, Check, X } from "lucide-react"

export default function MyTeamPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">My Teams</h1>
          <p className="text-white/60">Manage your team memberships and invitations.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <UserPlus className="w-4 h-4" /> Create New Team
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Team Card */}
          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                      Active
                    </span>
                    <span className="text-sm font-medium text-white/40">For Hackathon: Code Genesis</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">ByteMe Squad</h2>
                </div>
                <button className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'John Doe', role: 'Leader', initials: 'JD', isLeader: true },
                  { name: 'Alice Smith', role: 'Member', initials: 'AS', isLeader: false },
                  { name: 'Bob Jones', role: 'Member', initials: 'BJ', isLeader: false },
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white shadow-inner relative">
                      {member.initials}
                      {member.isLeader && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 border-2 border-[#1a1a1a] flex items-center justify-center">
                          <Crown className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white">{member.name}</div>
                      <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">{member.role}</div>
                    </div>
                  </div>
                ))}

                {/* Empty Slot */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 border-dashed cursor-pointer hover:bg-white/[0.03] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 border-dashed">
                    <UserPlus className="w-5 h-5 text-white/30" />
                  </div>
                  <div>
                    <div className="font-medium text-white/50">Invite Member</div>
                    <div className="text-xs text-white/30">1 slot remaining</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm font-bold">
                  <LogOut className="w-4 h-4" /> Leave Team
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Pending Invitations</h3>
          
          <div className="space-y-4">
            {[
              { team: 'CyberNinjas', event: 'Tech Quiz', inviter: 'Sarah Lee' },
            ].map((invite, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500" />
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-white mb-1">{invite.team}</h4>
                  <p className="text-sm text-white/50">Invited by <span className="text-white/80">{invite.inviter}</span> for {invite.event}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-sm font-bold transition-colors border border-emerald-500/20">
                    <Check className="w-4 h-4" /> Accept
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-bold transition-colors border border-red-500/20">
                    <X className="w-4 h-4" /> Decline
                  </button>
                </div>
              </div>
            ))}
            
            {/* If no more invites */}
            <div className="p-8 rounded-2xl border border-white/5 border-dashed text-center">
              <Users className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-sm font-medium text-white/40">No other pending invitations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
