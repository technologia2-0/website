'use client'

import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { createSponsor, updateSponsor } from '@/app/organizer/(protected)/sponsors/actions'

export type Sponsor = {
  id: string
  name: string
  logo_url: string
  website_url: string
  description: string
  category: string
  priority: number
}

interface Props {
  sponsor?: Sponsor | null
  isOpen: boolean
  onClose: () => void
}

export function SponsorEditorModal({ sponsor, isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null
  const isEditing = !!sponsor

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    try {
      if (isEditing) {
        await updateSponsor(sponsor.id, formData)
      } else {
        await createSponsor(formData)
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
            {isEditing ? 'Edit Sponsor' : 'Add New Sponsor'}
          </h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <form id="sponsor-form" action={handleSubmit} className="space-y-6">
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative group p-2">
                {sponsor?.logo_url ? (
                  <img src={sponsor.logo_url} alt="Logo" className="w-full h-full object-contain filter invert" />
                ) : (
                  <Upload className="w-8 h-8 text-white/20" />
                )}
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Logo URL (Transparent PNG)</label>
                <input required type="url" name="logo_url" defaultValue={sponsor?.logo_url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="https://..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Sponsor Name</label>
                <input required type="text" name="name" defaultValue={sponsor?.name} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Website URL</label>
                <input type="url" name="website_url" defaultValue={sponsor?.website_url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="https://..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Sponsor Category (Tier)</label>
                <select name="category" defaultValue={sponsor?.category || 'silver'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option value="title">Title Sponsor</option>
                  <option value="gold">Gold Sponsor</option>
                  <option value="silver">Silver Sponsor</option>
                  <option value="bronze">Bronze Sponsor</option>
                  <option value="partner">Partner / Co-sponsor</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Display Priority</label>
                <input type="number" name="priority" defaultValue={sponsor?.priority || 0} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Higher number = first" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Description</label>
              <textarea name="description" defaultValue={sponsor?.description} rows={3} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            {error && <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>}
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-white/10 bg-black flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/70 font-medium hover:bg-white/5 transition-colors">Cancel</button>
          <button type="submit" form="sponsor-form" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Sponsor'}
          </button>
        </div>
      </div>
    </div>
  )
}
