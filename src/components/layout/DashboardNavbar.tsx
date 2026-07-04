import { Bell, Search, Menu } from "lucide-react"

export function DashboardNavbar() {
  return (
    <header className="h-20 w-full glass sticky top-0 z-40 border-b border-white/10 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-white/60 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex relative w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search events, teams..." 
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold text-white leading-none">John Doe</div>
            <div className="text-xs text-primary font-medium mt-1">CS Dept • 120 Points</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            J
          </div>
        </div>
      </div>
    </header>
  )
}
