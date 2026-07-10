import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center bg-black">
      <div className="max-w-md w-full glass-card p-12 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <SearchX className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-6xl font-black text-white mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        
        <p className="text-white/60 mb-8 leading-relaxed text-sm">
          The page you are looking for doesn't exist or has been moved. Check the URL and try again.
        </p>
        
        <Link
          href="/"
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] block"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}
