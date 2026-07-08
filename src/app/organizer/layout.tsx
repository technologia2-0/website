import { OrganizerSidebar } from "@/components/layout/OrganizerSidebar"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"
import { Trophy } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function OrganizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile || profile.role === "student") {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      <OrganizerSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* We can reuse DashboardNavbar but pass different props if needed, or just reuse it for now */}
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
