'use client'

import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { organizerLogin } from './actions'

export function LoginForm({ error, message }: { error?: string, message?: string }) {
  return (
    <div className="bg-black/60 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner text-white">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Master Admin</h1>
        <p className="text-white/50 text-sm">System Owner Access Only</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider" htmlFor="email">
            Master Admin ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-white/40" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              readOnly
              value="technologiaitcsds@gmail.com"
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none transition-all text-sm font-medium cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider" htmlFor="password">Security Key</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-white/40" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="Tech@2026"
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-xs font-bold text-center bg-red-500/10 border border-red-500/20 py-2.5 rounded-lg uppercase tracking-wider">{error}</div>}
        {message && <div className="text-emerald-400 text-xs font-bold text-center bg-emerald-500/10 border border-emerald-500/20 py-2.5 rounded-lg uppercase tracking-wider">{message}</div>}

        <button
          formAction={organizerLogin}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 py-3 rounded-xl font-bold transition-all mt-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          Authenticate <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        Participant access?{' '}
        <Link href="/login" className="text-white hover:underline font-medium">
          Go to student portal
        </Link>
      </div>
    </div>
  )
}
