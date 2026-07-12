'use client'

import { User, Save, Upload } from 'lucide-react'

export function ProfileClient({ email, metadata }: { email: string, metadata: any }) {
  const fullName = metadata.full_name || "Participant"
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
  
  const department = metadata.department || "General"
  const year = metadata.year || "1"
  const rollNo = metadata.roll_number || "N/A"
  const phone = metadata.phone || ""

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-blue-500" />
          My Profile
        </h1>
        <p className="text-white/60">Manage your personal information and contact details.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 space-y-10">
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-[2px]">
            <div className="w-full h-full bg-black rounded-[22px] flex items-center justify-center text-4xl font-bold text-white shadow-inner">
              {initials}
            </div>
          </div>
          <div className="text-center sm:text-left pt-2">
            <h3 className="text-xl font-bold text-white mb-2">Profile Picture</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">Upload a clear photo of yourself. This may be used for your ID pass verification.</p>
            <div className="flex justify-center sm:justify-start gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/5">
                <Upload className="w-4 h-4" /> Upload New
              </button>
              <button className="px-5 py-2.5 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 font-medium transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
          {/* Editable Fields */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Editable Details</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Full Name</label>
              <input type="text" defaultValue={fullName} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Email Address</label>
              <input type="email" defaultValue={email} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Phone Number</label>
              <input type="tel" defaultValue={phone} placeholder="+91 9876543210" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Bio</label>
              <textarea rows={3} placeholder="Tell us a bit about yourself..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors resize-none"></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">GitHub URL</label>
              <input type="url" placeholder="https://github.com/yourusername" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">LinkedIn URL</label>
              <input type="url" placeholder="https://linkedin.com/in/yourusername" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
            </div>
          </div>

          {/* Read Only Fields */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Academic Details</h3>
            <p className="text-xs text-gray-500 mb-4">These fields are read-only. Contact admin to change them.</p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Department</label>
              <input type="text" value={department} disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Year of Study</label>
              <input type="text" value={`Year ${year}`} disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Roll Number</label>
              <input type="text" value={rollNo} disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
          <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-bold transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}
