import Link from 'next/link'
import { LoginForm } from './LoginForm'

export default async function OrganizerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#050505]">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-white/40 hover:text-white mb-8 transition-colors">
          ← Back to public site
        </Link>
        
        <LoginForm error={error} message={message} />
      </div>
    </div>
  )
}
