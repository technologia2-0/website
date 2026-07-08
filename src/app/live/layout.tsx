export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen overflow-hidden cursor-none selection:bg-transparent">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Content */}
      <main className="relative z-10 w-full h-screen flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  )
}
