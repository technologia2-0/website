import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function AboutPage() {
  const supabase = await createClient();

  // Fetch active edition
  const { data: edition } = await supabase
    .from('editions')
    .select('id, year, name')
    .eq('status', 'active')
    .single();

  let config = null;
  if (edition) {
    const { data } = await supabase
      .from('homepage_config')
      .select('about_text')
      .eq('edition_id', edition.id)
      .single();
    config = data;
  }

  const aboutText = config?.about_text || 'Technologia is the premier technical and cultural festival showcasing innovation, talent, and creativity.';

  return (
    <main className="min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-5xl font-black text-white mb-6">About <span className="text-primary">{edition?.name || 'Technologia'}</span></h1>
        
        <div className="glass-card p-8 md:p-12 text-lg text-white/80 leading-relaxed whitespace-pre-wrap">
          {aboutText}
        </div>
      </div>
    </main>
  );
}
