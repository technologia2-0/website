'use client'

import { Download, Share2, Award, ExternalLink, Printer } from 'lucide-react'
import { motion } from 'framer-motion'

const certificates = [
  { id: '1', event: 'Hackathon: Code Genesis', type: 'Winner (1st Place)', issueDate: 'Oct 26, 2026', certId: 'CERT-2026-8812', color: 'from-amber-400 to-yellow-600', isWinner: true },
  { id: '2', event: 'Tech Quiz', type: 'Participation', issueDate: 'Oct 25, 2026', certId: 'CERT-2026-7492', color: 'from-blue-400 to-indigo-600', isWinner: false },
]

export default function CertificatesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">My Certificates</h1>
          <p className="text-white/60">Download and verify your official fest certificates.</p>
        </div>
        
        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
          <Award className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-bold text-white">2 Earned</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert, i) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            {/* Certificate Preview Card */}
            <div className="relative aspect-[1.414/1] w-full rounded-2xl bg-[#050505] border border-white/10 overflow-hidden shadow-2xl mb-4 group-hover:border-white/30 transition-colors duration-500">
              {/* Ornate Background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cert.color} rounded-full blur-[100px] opacity-20`} />
              <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr ${cert.color} rounded-full blur-[100px] opacity-10`} />
              
              {/* Corner Borders */}
              <div className="absolute inset-4 border-[4px] border-double border-white/10 rounded-xl" />
              <div className="absolute inset-6 border border-white/5 rounded-lg" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                <div className="w-12 h-12 mb-4 bg-gradient-to-br from-white/10 to-transparent rounded-full flex items-center justify-center">
                  <Award className={`w-6 h-6 ${cert.isWinner ? 'text-amber-400' : 'text-blue-400'}`} />
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">Certificate of {cert.type.split(' ')[0]}</h3>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6 font-semibold">Technologia 2026</p>
                
                <p className="font-serif text-white/60 italic text-sm mb-2">This is to certify that</p>
                <p className="text-xl font-bold text-white mb-2">Krish Goel</p>
                <p className="font-serif text-white/60 italic text-sm mb-4">has successfully participated in</p>
                <p className="text-lg font-bold text-white">{cert.event}</p>
                
                {cert.isWinner && (
                  <div className="mt-4 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-full">
                    {cert.type.replace('Winner ', '')}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div>
                <div className="text-sm font-bold text-white mb-1">{cert.event}</div>
                <div className="flex items-center gap-3 text-xs text-white/40 font-mono">
                  <span>Issued: {cert.issueDate}</span>
                  <span>•</span>
                  <span>ID: {cert.certId}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
        <div className="p-3 rounded-xl bg-white/5 shrink-0">
          <ExternalLink className="w-5 h-5 text-white/60" />
        </div>
        <div>
          <h4 className="font-bold text-white mb-1">Verify Certificates</h4>
          <p className="text-sm text-white/60 mb-3">All certificates issued by Technologia are digitally signed and verifiable online.</p>
          <a href="#" className="text-sm font-bold text-primary hover:underline">Verify a certificate using its ID &rarr;</a>
        </div>
      </div>
    </div>
  )
}
