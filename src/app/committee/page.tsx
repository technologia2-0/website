import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function CommitteePage() {
  const supabase = await createClient();

  const { data: membersData } = await supabase
    .from('committee_members')
    .select('*')
    .order('priority', { ascending: false })
    .order('name', { ascending: true });

  const members = membersData || [];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-5xl font-black text-white mb-12">Core <span className="text-primary">Committee</span></h1>
        
        {members.length === 0 ? (
          <div className="glass-card p-16 text-center text-white/50 flex flex-col items-center">
            <Users className="w-12 h-12 mb-4 opacity-50" />
            <p>Committee members will be announced soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member: any) => (
              <div key={member.id} className="glass-card p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/5 border-2 border-white/10 mb-6 flex items-center justify-center">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-12 h-12 text-white/20" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.designation}</p>
                {member.department && (
                  <p className="text-white/40 text-xs">{member.department}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
