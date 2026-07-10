'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { createAnnouncement, updateAnnouncement } from '@/app/organizer/(protected)/announcements/actions'

type Announcement = {
  id: string
  title: string
  description: string
  priority: string
  publication_status: string
}

interface Props {
  announcement?: Announcement | null
  isOpen: boolean
  onClose: () => void
}

export function AnnouncementEditorModal({ announcement, isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const isEditing = !!announcement

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    try {
      if (isEditing) {
        await updateAnnouncement(announcement.id, formData)
      } else {
        await createAnnouncement(formData)
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
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditing ? 'Edit Notice' : 'Create New Notice'}
          </h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <form id="announcement-form" action={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Title</label>
                <input required type="text" name="title" defaultValue={announcement?.title} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Schedule Change" />
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Description</label>
                <textarea required name="description" defaultValue={announcement?.description} rows={4} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Detailed message..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Priority</label>
                  <select name="priority" defaultValue={announcement?.priority || 'info'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Status</label>
                  <select name="publication_status" defaultValue={announcement?.publication_status || 'draft'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>}

          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-white/10 bg-black flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/70 font-medium hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" form="announcement-form" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center gap-2">
            {isSubmitting ? 'Saving...' : 'Save Notice'}
          </button>
        </div>
      </div>
    </div>
  )
}
