'use client'

import { useState } from 'react'
import { Plus, Search, Trash2, Edit, Briefcase, ExternalLink } from 'lucide-react'
import { SponsorEditorModal, type Sponsor } from './SponsorEditorModal'
import { deleteSponsor } from '@/app/organizer/(protected)/sponsors/actions'

export function SponsorListClient({ initialSponsors }: { initialSponsors: Sponsor[] }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)

  const filtered = initialSponsors.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (s: Sponsor) => {
    setEditingSponsor(s)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingSponsor(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      await deleteSponsor(id)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" /> 
            Sponsor Management
          </h1>
          <p className="text-white/60">Manage corporate partners and sponsors for the event.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search sponsors..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button onClick={handleCreate} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
            <Plus className="w-5 h-5" /> Add Sponsor
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Sponsor</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Website</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No sponsors found. Click "Add Sponsor" to create one.
                  </td>
                </tr>
              ) : filtered.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-16 h-10 rounded-lg bg-white/5 p-1 flex items-center justify-center shrink-0 border border-white/10">
                      {sponsor.logo_url ? (
                        <img src={sponsor.logo_url} alt="" className="max-w-full max-h-full object-contain filter invert" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-white/20" />
                      )}
                    </div>
                    <div className="font-bold text-white">{sponsor.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      sponsor.category === 'title' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      sponsor.category === 'gold' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      sponsor.category === 'silver' ? 'bg-gray-400/10 text-gray-300 border border-gray-400/20' :
                      sponsor.category === 'bronze' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-white/5 text-white/60 border border-white/10'
                    }`}>
                      {sponsor.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white/60 text-sm font-mono">{sponsor.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    {sponsor.website_url ? (
                      <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors inline-flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" /> Link
                      </a>
                    ) : (
                      <span className="text-white/20">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(sponsor)} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(sponsor.id)} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
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

      <SponsorEditorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        sponsor={editingSponsor} 
      />
    </div>
  )
}
