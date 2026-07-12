import { HelpCircle, MessageCircle, FileQuestion, Mail, Phone, ExternalLink, ShieldAlert } from 'lucide-react'

export default function HelpCenterPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Help Center</h1>
        <p className="text-white/60">Find answers or contact the organizing team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">Chat with Support</h3>
          <p className="text-sm text-white/50 mb-6">Use Mission Control AI or connect with a human coordinator.</p>
          <button className="text-blue-400 font-semibold text-sm flex items-center gap-2">
            Start Chat <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileQuestion className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">Fest FAQs</h3>
          <p className="text-sm text-white/50 mb-6">Browse our comprehensive guide for all common queries.</p>
          <button className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
            Read Guide <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-bold text-white text-lg mb-2">Report Issue</h3>
          <p className="text-sm text-white/50 mb-6">Report technical glitches, lost items, or disputes.</p>
          <button className="text-purple-400 font-semibold text-sm flex items-center gap-2">
            File Report <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-6">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white mb-1">Medical Emergency</div>
              <div className="text-xs text-white/50">Campus Health Center (24/7)</div>
            </div>
            <a href="tel:+1234567890" className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>
          <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white mb-1">Security / Help Desk</div>
              <div className="text-xs text-white/50">Main Registration Counter</div>
            </div>
            <a href="tel:+0987654321" className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
