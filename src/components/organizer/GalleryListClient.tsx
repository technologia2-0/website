'use client'

import { useState } from 'react'
import { Plus, Search, Trash2, Edit, Image as ImageIcon, Video, Star, Eye, EyeOff } from 'lucide-react'
import { GalleryEditorModal, type GalleryItem, type Category, type EventItem } from './GalleryEditorModal'
import { deleteGalleryItem } from '@/app/organizer/(protected)/gallery/actions'

export function GalleryListClient({ 
  initialItems, 
  categories, 
  events 
}: { 
  initialItems: GalleryItem[]
  categories: Category[]
  events: EventItem[]
}) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)

  const filtered = initialItems.filter(item => 
    (item.title || '').toLowerCase().includes(search.toLowerCase()) || 
    (item.event_name || '').toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this media?")) {
      await deleteGalleryItem(id)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-primary" /> 
            Gallery & Media
          </h1>
          <p className="text-white/60">Manage photos and videos from all events and editions.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search media..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button onClick={handleCreate} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
            <Plus className="w-5 h-5" /> Add Media
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Category & Event</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No media found. Click "Add Media" to upload one.
                  </td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-24 h-16 rounded-lg bg-black overflow-hidden relative border border-white/10">
                      {item.type === 'video' ? (
                        <>
                          <video src={item.url} className="w-full h-full object-cover opacity-70" />
                          <div className="absolute inset-0 flex items-center justify-center text-white/80"><Video className="w-6 h-6 drop-shadow-md" /></div>
                        </>
                      ) : (
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white mb-1 flex items-center gap-2">
                      {item.title || 'Untitled'}
                      {item.is_featured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <div className="text-xs text-white/40 max-w-[200px] truncate">{item.photographer ? `By: ${item.photographer}` : '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-primary mb-1">{item.event_name || 'General'}</div>
                    <div className="text-xs text-white/40">{item.gallery_categories?.name || 'Uncategorized'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                      item.visibility === 'published' ? 'text-emerald-400' : 'text-white/40'
                    }`}>
                      {item.visibility === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {item.visibility}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400/60 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
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

      <GalleryEditorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={editingItem} 
        categories={categories}
        events={events}
      />
    </div>
  )
}
