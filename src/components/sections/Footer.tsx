import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white mb-6 inline-block">
              TECH<span className="text-accent-blue">NOLOGIA</span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed font-light">
              The premier technical fest. 100% automated, fully digital, and extremely competitive. Join the revolution.
            </p>
            <div className="flex items-center gap-6 text-gray-500">
              <a href="#" className="hover:text-accent-blue transition-colors">Twitter</a>
              <a href="#" className="hover:text-accent-purple transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#about" className="hover:text-white transition-colors">About Technologia</Link></li>
              <li><Link href="#journey" className="hover:text-white transition-colors">The Journey</Link></li>
              <li><Link href="#departments" className="hover:text-white transition-colors">Departments</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide">Portals</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Participant Login</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">New Registration</Link></li>
              <li><Link href="/organizer/login" className="hover:text-accent-purple transition-colors flex items-center gap-2">Organizer Dashboard</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>&copy; {new Date().getFullYear()} Technologia Platform. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Designed and Developed by <span className="text-gray-400 font-medium">Technologia Development Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
