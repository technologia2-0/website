'use client'

import { useState } from 'react'
import { Plus, Search, Megaphone, Trash2, Edit } from 'lucide-react'
import { AnnouncementEditorModal } from './AnnouncementEditorModal'
import { deleteAnnouncement } from '@/app/organizer/(protected)/announcements/actions'

type Announcement = {
  id: string
  title: string
  description: string
  priority: string
  publication_status: string
  created_at: string
}

export function AnnouncementListClient({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)

  const filtered = initialAnnouncements.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))

  const handleEdit = (ann: Announcement) => {
    setEditingAnnouncement(ann)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingAnnouncement(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      await deleteAnnouncement(id)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-primary" /> 
            Announcements
          </h1>
          <p className="text-white/60">Broadcast updates to all participants instantly.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button onClick={handleCreate} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
            <Plus className="w-5 h-5" /> New Notice
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No announcements found. Click "New Notice" to create one.
                  </td>
                </tr>
              ) : filtered.map((ann) => (
                <tr key={ann.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{ann.title}</div>
                    <div className="text-xs text-white/50 mt-1 line-clamp-1">{ann.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      ann.priority === 'urgent' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      ann.priority === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {ann.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      ann.publication_status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      {ann.publication_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">
                    {new Date(ann.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(ann)} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(ann.id)} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
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

      <AnnouncementEditorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        announcement={editingAnnouncement} 
      />
    </div>
  )
}
