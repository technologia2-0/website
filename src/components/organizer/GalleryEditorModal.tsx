'use client'

import { useState } from 'react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { createGalleryItem, updateGalleryItem } from '@/app/organizer/(protected)/gallery/actions'

export type GalleryItem = {
  id: string
  url: string
  type: string
  title: string
  description: string
  event_name: string
  category_id: string | null
  photographer: string
  visibility: string
  is_featured: boolean
  gallery_categories?: { name: string } | null
}

export type Category = { id: string, name: string }
export type EventItem = { title: string }

interface Props {
  item?: GalleryItem | null
  categories: Category[]
  events: EventItem[]
  isOpen: boolean
  onClose: () => void
}

export function GalleryEditorModal({ item, categories, events, isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null
  const isEditing = !!item

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    try {
      if (isEditing) {
        await updateGalleryItem(item.id, formData)
      } else {
        await createGalleryItem(formData)
      }
      onClose()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditing ? 'Edit Media' : 'Add New Media'}
          </h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <form id="gallery-form" action={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 aspect-video rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center overflow-hidden shrink-0 relative group p-2">
                {item?.url ? (
                  item.type === 'video' ? (
                    <video src={item.url} className="w-full h-full object-cover rounded-lg" controls />
                  ) : (
                    <img src={item.url} alt="Media" className="w-full h-full object-cover rounded-lg" />
                  )
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-white/20 mb-2" />
                    <span className="text-xs text-white/40 font-medium">Preview</span>
                  </>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Media URL</label>
                  <input required type="url" name="url" defaultValue={item?.url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="https://..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Media Type</label>
                  <select name="type" defaultValue={item?.type || 'image'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Title</label>
                <input required type="text" name="title" defaultValue={item?.title} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Photographer / Uploader</label>
                <input type="text" name="photographer" defaultValue={item?.photographer} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Event</label>
                <select name="event_name" defaultValue={item?.event_name || 'none'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option value="none">-- No Specific Event --</option>
                  {events.map(e => (
                    <option key={e.title} value={e.title}>{e.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Category</label>
                <select name="category_id" defaultValue={item?.category_id || 'none'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option value="none">-- Select Category --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Description</label>
              <textarea name="description" defaultValue={item?.description} rows={2} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <div className="flex gap-4">
                <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                  <input type="checkbox" name="is_featured" defaultChecked={item?.is_featured} className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary focus:ring-offset-0 bg-black" />
                  <div>
                    <div className="font-bold text-white text-sm">Featured Image</div>
                    <div className="text-xs text-white/50">Show on the main landing page slider</div>
                  </div>
                </label>

                <div className="flex-1">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Visibility</label>
                  <select name="visibility" defaultValue={item?.visibility || 'published'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="published">Published</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>}
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-white/10 bg-black flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/70 font-medium hover:bg-white/5 transition-colors">Cancel</button>
          <button type="submit" form="gallery-form" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Media'}
          </button>
        </div>
      </div>
    </div>
  )
}
