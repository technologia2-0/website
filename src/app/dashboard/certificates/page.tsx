import { Certificate } from "@/components/ui/Certificate"
import { Button } from "@/components/ui/Button"
import { Download } from "lucide-react"

export default function CertificatesPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Certificates</h1>
        <p className="text-white/60">View and download your verified certificates from Technologia 2026.</p>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Winner Certificate</h2>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              <Certificate name="John Doe" event="Code Genesis" rank={1} type="Winner" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Participation Certificate</h2>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              <Certificate name="John Doe" event="System Design" rank={null} type="Participation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
