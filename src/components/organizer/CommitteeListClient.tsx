'use client'

import { useState } from 'react'
import { Plus, Search, Trash2, Edit, Users, Eye, EyeOff } from 'lucide-react'
import { CommitteeEditorModal, type CommitteeMember } from './CommitteeEditorModal'
import { deleteCommitteeMember } from '@/app/organizer/(protected)/committee/actions'

export function CommitteeListClient({ initialMembers }: { initialMembers: CommitteeMember[] }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null)

  const filtered = initialMembers.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.designation.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (m: CommitteeMember) => {
    setEditingMember(m)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingMember(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this committee member?")) {
      await deleteCommitteeMember(id)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" /> 
            Committee Management
          </h1>
          <p className="text-white/60">Manage the core team and faculty visible on the Landing Page.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button onClick={handleCreate} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
            <Plus className="w-5 h-5" /> Add Member
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No committee members found. Click "Add Member" to create one.
                  </td>
                </tr>
              ) : filtered.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 overflow-hidden shrink-0">
                      {member.image_url ? (
                        <img src={member.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                          <Users className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white">{member.name}</div>
                      <div className="text-xs text-primary font-medium">{member.designation}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">{member.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-white/60">{member.email || '-'}</div>
                    <div className="text-xs text-white/60">{member.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                      member.visibility === 'published' ? 'text-emerald-400' : 'text-white/40'
                    }`}>
                      {member.visibility === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {member.visibility}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(member)} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CommitteeEditorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        member={editingMember} 
      />
    </div>
  )
}
