'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Image as ImageIcon, Heart, Download, Share2, X, Play } from 'lucide-react'

// Dummy data for gallery
const mediaItems = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Inauguration Ceremony', likes: 124 },
  { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', title: 'Hackathon Timelapse', likes: 89 },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', title: 'Tech Talk: AI Future', likes: 256 },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', title: 'RoboWars Arena', likes: 412 },
  { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', title: 'Gaming Tournament', likes: 178 },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1523580494112-071d192c6995?w=800&q=80', title: 'Closing Ceremony', likes: 532 },
]

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all')

  const filteredItems = mediaItems.filter(item => {
    if (filter === 'images') return item.type === 'image'
    if (filter === 'videos') return item.type === 'video'
    return true
  })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Fest Gallery</h1>
          <p className="text-white/60">Relive the best moments of Technologia 2026.</p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('images')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${filter === 'images' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4" /> Photos
          </button>
          <button 
            onClick={() => setFilter('videos')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${filter === 'videos' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
          >
            <Camera className="w-4 h-4" /> Videos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
            onClick={() => setSelectedItem(item.id)}
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-lg font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
              <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-sm">
                  <Heart className="w-4 h-4 fill-rose-400" /> {item.likes}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {item.type === 'video' && (
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Play className="w-5 h-5 text-white ml-1" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[101]"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative max-w-5xl w-full max-h-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {mediaItems.find(i => i.id === selectedItem)?.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Play className="w-10 h-10 text-white ml-2" />
                  </div>
                </div>
              )}
              <img 
                src={mediaItems.find(i => i.id === selectedItem)?.url} 
                alt="Fullscreen Preview" 
                className="w-full h-auto max-h-[80vh] object-contain bg-black/50"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent flex justify-between items-end">
                <h2 className="text-2xl font-bold text-white">{mediaItems.find(i => i.id === selectedItem)?.title}</h2>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Download className="w-4 h-4" /> Download High-Res
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
