'use client'

import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { createCommitteeMember, updateCommitteeMember } from '@/app/organizer/(protected)/committee/actions'

export type CommitteeMember = {
  id: string
  name: string
  designation: string
  department: string
  year: string
  email: string
  phone: string
  github_url: string
  linkedin_url: string
  instagram_url: string
  description: string
  priority: number
  visibility: string
  image_url: string
}

interface Props {
  member?: CommitteeMember | null
  isOpen: boolean
  onClose: () => void
}

export function CommitteeEditorModal({ member, isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null
  const isEditing = !!member

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    try {
      if (isEditing) {
        await updateCommitteeMember(member.id, formData)
      } else {
        await createCommitteeMember(formData)
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
            {isEditing ? 'Edit Committee Member' : 'Add Committee Member'}
          </h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <form id="committee-form" action={handleSubmit} className="space-y-6">
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 relative group">
                {member?.image_url ? (
                  <img src={member.image_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-white/20" />
                )}
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Profile Image URL</label>
                <input type="url" name="image_url" defaultValue={member?.image_url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="https://..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Full Name</label>
                <input required type="text" name="name" defaultValue={member?.name} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Designation</label>
                <input required type="text" name="designation" defaultValue={member?.designation} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Technical Head" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Department</label>
                <select name="department" defaultValue={member?.department || 'IT'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option value="IT">IT</option>
                  <option value="CS">CS</option>
                  <option value="DS">DS</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Year</label>
                <input type="text" name="year" defaultValue={member?.year} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="e.g. 3rd Year" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Email</label>
                <input type="email" name="email" defaultValue={member?.email} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Phone</label>
                <input type="text" name="phone" defaultValue={member?.phone} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">GitHub</label>
                <input type="url" name="github_url" defaultValue={member?.github_url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">LinkedIn</label>
                <input type="url" name="linkedin_url" defaultValue={member?.linkedin_url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Instagram</label>
                <input type="url" name="instagram_url" defaultValue={member?.instagram_url} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Description</label>
              <textarea name="description" defaultValue={member?.description} rows={2} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Display Order</label>
                <input type="number" name="priority" defaultValue={member?.priority || 0} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Higher number = first" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Visibility</label>
                <select name="visibility" defaultValue={member?.visibility || 'published'} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option value="published">Published</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            {error && <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>}
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-white/10 bg-black flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/70 font-medium hover:bg-white/5 transition-colors">Cancel</button>
          <button type="submit" form="committee-form" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </div>
    </div>
  )
}
