'use client'
 
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center bg-black">
      <div className="max-w-md w-full glass-card p-12 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Something went wrong</h2>
        <p className="text-white/60 mb-8 leading-relaxed text-sm">
          A critical error occurred while loading this page. Our engineers have been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" /> Try again
          </button>
          <Link
            href="/"
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
