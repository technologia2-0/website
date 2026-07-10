import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function SponsorsPage() {
  const supabase = await createClient();

  const { data: sponsorsData } = await supabase
    .from('sponsors')
    .select('*')
    .order('priority', { ascending: false });

  const sponsors = sponsorsData || [];

  // Group by category (new schema)
  const title = sponsors.filter((s: any) => s.category === 'title');
  const gold = sponsors.filter((s: any) => s.category === 'gold');
  const silver = sponsors.filter((s: any) => s.category === 'silver');
  const bronze = sponsors.filter((s: any) => s.category === 'bronze');

  return (
    <main className="min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-5xl font-black text-white mb-4">Our <span className="text-primary">Sponsors</span></h1>
        <p className="text-white/60 mb-12 max-w-2xl text-lg">We are deeply grateful for the support of our partners who make this festival possible.</p>
        
        {sponsors.length === 0 ? (
          <div className="glass-card p-16 text-center text-white/50 flex flex-col items-center">
            <Star className="w-12 h-12 mb-4 opacity-50" />
            <p>Sponsors will be announced soon.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {gold.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 fill-amber-400" /> Gold Partners
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gold.map((s: any) => (
                    <SponsorCard key={s.id} sponsor={s} />
                  ))}
                </div>
              </section>
            )}

            {silver.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-300 mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 fill-slate-300" /> Silver Partners
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {silver.map((s: any) => (
                    <SponsorCard key={s.id} sponsor={s} />
                  ))}
                </div>
              </section>
            )}

            {bronze.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 fill-orange-400" /> Bronze Partners
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {bronze.map((s: any) => (
                    <SponsorCard key={s.id} sponsor={s} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function SponsorCard({ sponsor }: { sponsor: any }) {
  const content = (
    <div className="glass-card p-8 flex flex-col items-center justify-center text-center aspect-video hover:bg-white/5 transition-all hover:scale-[1.02]">
      {sponsor.logo_url ? (
        <img src={sponsor.logo_url} alt={sponsor.name} className="max-w-full max-h-full object-contain mb-4" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Star className="w-8 h-8 text-white/20" />
        </div>
      )}
      <h3 className="text-xl font-bold text-white">{sponsor.name}</h3>
    </div>
  );

  if (sponsor.website_url) {
    return (
      <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
