import { signup } from '@/app/login/actions'
import Link from 'next/link'
import { ArrowRight, Lock, Mail, User, Hash } from 'lucide-react'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-white/60 hover:text-white mb-8 transition-colors">
          ← Back to home
        </Link>
        
        <div className="glass-card p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create an account</h1>
            <p className="text-white/60">Register for Technologia platform</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80" htmlFor="full_name">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80" htmlFor="roll_number">Roll Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="roll_number"
                  name="roll_number"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="23IT001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80" htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="student@college.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-sm font-medium text-center bg-red-400/10 py-2 rounded-lg">{error}</div>}
            {message && <div className="text-primary text-sm font-medium text-center bg-primary/10 py-2 rounded-lg">{message}</div>}

            <button
              formAction={signup}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] mt-2"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-white/60">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
