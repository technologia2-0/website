export default function LiveDisplayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex flex-col">
      {children}
    </div>
  )
}
