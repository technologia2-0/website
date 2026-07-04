import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="text-3xl font-bold tracking-tighter text-white mb-4">
              TECH<span className="text-primary">NOLOGIA</span>
            </div>
            <p className="text-white/60 max-w-sm mb-6">
              The premier technical fest. 100% automated, fully digital, and extremely competitive.
            </p>
            <div className="flex items-center gap-4 text-white/40">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="#schedule" className="hover:text-white transition-colors">Schedule</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Participant Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <div>&copy; {new Date().getFullYear()} Technologia Platform. All rights reserved.</div>
          <div>Built by Lead Engineer</div>
        </div>
      </div>
    </footer>
  )
}
