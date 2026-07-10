'use client'

import { useState } from 'react'
import { Search, Filter, ShieldCheck, Mail, Save } from 'lucide-react'
import { updateUserRole } from '@/app/organizer/(protected)/users/actions'

type Profile = {
  id: string
  full_name: string
  roll_number: string
  department: string
  role: string
  created_at: string
}

export function UserListClient({ initialUsers }: { initialUsers: Profile[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)
  
  // Track selected roles locally for the UI before saving
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({})

  const filteredUsers = initialUsers.filter(u => {
    const matchesSearch = u.full_name?.toLowerCase().includes(search.toLowerCase()) || 
                          u.roll_number?.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || u.role === filter
    return matchesSearch && matchesFilter
  })

  const handleRoleChange = (userId: string, newRole: string) => {
    setSelectedRoles(prev => ({ ...prev, [userId]: newRole }))
  }

  const handleSaveRole = async (userId: string) => {
    const newRole = selectedRoles[userId]
    if (!newRole) return

    setUpdating(userId)
    try {
      await updateUserRole(userId, newRole)
      // Clear the local override so it falls back to the server prop (which is now updated via revalidatePath)
      setSelectedRoles(prev => {
        const next = { ...prev }
        delete next[userId]
        return next
      })
    } catch (err: any) {
      alert(err.message || 'Failed to update role')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Users & Roles</h1>
          <p className="text-white/60">Manage participant roles and promote organizers.</p>
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
            <option value="admin">Admins</option>
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
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Current Role</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                    No users found matching the filters.
                  </td>
                </tr>
              ) : filteredUsers.map((user) => {
                const isModified = selectedRoles[user.id] && selectedRoles[user.id] !== user.role;
                
                return (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white mb-1">{user.full_name}</div>
                      <div className="text-xs font-mono text-white/40">{user.roll_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">
                        {user.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`w-fit px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        user.role === 'super_admin' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        user.role === 'coordinator' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                        user.role === 'volunteer' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-white/5 text-white/50 border border-white/10'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select 
                          className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                          value={selectedRoles[user.id] || user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={updating === user.id}
                        >
                          <option value="student">Student</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="coordinator">Coordinator</option>
                          <option value="admin">Admin</option>
                        </select>
                        
                        {isModified && (
                          <button 
                            onClick={() => handleSaveRole(user.id)}
                            disabled={updating === user.id}
                            className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            title="Save Role"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
