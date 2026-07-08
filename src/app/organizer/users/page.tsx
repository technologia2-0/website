'use client'

import { useState } from 'react'
import { Search, Filter, MoreHorizontal, ShieldCheck, Mail, UserX, Award } from 'lucide-react'

// Dummy Data
const mockUsers = [
  { id: '1', name: 'Krish Goel', roll: 'TECH-26-8942', dept: 'CS', role: 'student', events: 4, points: 120, status: 'approved' },
  { id: '2', name: 'Gourav Jangid', roll: 'TECH-26-7731', dept: 'IT', role: 'volunteer', events: 2, points: 10, status: 'approved' },
  { id: '3', name: 'Alex Smith', roll: 'TECH-26-1123', dept: 'DS', role: 'student', events: 1, points: 0, status: 'pending' },
  { id: '4', name: 'Dr. Jane Doe', roll: 'FAC-001', dept: 'CS', role: 'coordinator', events: 0, points: 0, status: 'approved' },
]

export default function UserManagerPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Users & Teams</h1>
          <p className="text-white/60">Manage participants, assign volunteers, and view PR points.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name or roll..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <select 
            className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors appearance-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="volunteer">Volunteers</option>
            <option value="coordinator">Coordinators</option>
          </select>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Participant</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Role & Status</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Stats</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUsers.filter(u => filter === 'all' || u.role === filter).map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white mb-1">{user.name}</div>
                    <div className="text-xs font-mono text-white/40">{user.roll}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">
                      {user.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <span className={`w-fit px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        user.role === 'coordinator' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                        user.role === 'volunteer' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-white/5 text-white/50 border border-white/10'
                      }`}>
                        {user.role}
                      </span>
                      {user.status === 'pending' && (
                        <span className="w-fit px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                          Pending Approval
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-bold text-white mb-1">{user.events} Events</div>
                    <div className="text-xs font-semibold text-yellow-500/70">{user.points} PR Points</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-white/40 hover:text-emerald-400 rounded-lg hover:bg-emerald-400/10 transition-colors" title="Approve/Verify">
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors" title="Email User">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
