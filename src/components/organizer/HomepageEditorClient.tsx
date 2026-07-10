'use client'

import { useState } from 'react'
import { Save, LayoutTemplate } from 'lucide-react'
import { updateHomepageContent } from '@/app/organizer/(protected)/homepage/actions'

type HomepageContent = {
  hero_title: string
  hero_subtitle: string
  hero_description: string
  countdown_date: string
  about_title: string
  about_description: string
  vision_text: string
  mission_text: string
}

export function HomepageEditorClient({ content }: { content: HomepageContent }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Format date for datetime-local input
  const defaultDate = content.countdown_date 
    ? new Date(content.countdown_date).toISOString().slice(0, 16)
    : ''

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')
    setMessage('')
    try {
      await updateHomepageContent(formData)
      setMessage('Homepage content updated successfully! The Landing Page is now live with these changes.')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8 text-primary" />
          Homepage Content
        </h1>
        <p className="text-white/60">Update the exact text visible on the public Landing Page.</p>
      </div>

      <form action={handleSubmit} className="space-y-8">
        
        {/* Hero Section Edit */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Hero Section</h2>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Hero Title</label>
              <input required type="text" name="hero_title" defaultValue={content.hero_title} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>
            
            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Hero Subtitle</label>
              <input required type="text" name="hero_subtitle" defaultValue={content.hero_subtitle} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Hero Description</label>
              <textarea required name="hero_description" defaultValue={content.hero_description} rows={3} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Countdown Target Date & Time</label>
              <input required type="datetime-local" name="countdown_date" defaultValue={defaultDate} className="w-full md:w-1/2 bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>
          </div>
        </div>

        {/* About Section Edit */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">About Section</h2>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">About Title</label>
              <input required type="text" name="about_title" defaultValue={content.about_title} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">About Description</label>
              <textarea required name="about_description" defaultValue={content.about_description} rows={4} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Vision Text</label>
                <textarea required name="vision_text" defaultValue={content.vision_text} rows={4} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">Mission Text</label>
                <textarea required name="mission_text" defaultValue={content.mission_text} rows={4} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-medium">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-medium">
            {error}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
