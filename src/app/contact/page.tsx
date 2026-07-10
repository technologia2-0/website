import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function ContactPage() {
  const supabase = await createClient();

  const { data: edition } = await supabase
    .from('editions')
    .select('id')
    .eq('status', 'active')
    .single();

  let config = null;
  if (edition) {
    const { data } = await supabase
      .from('homepage_config')
      .select('contact_email, contact_phone')
      .eq('edition_id', edition.id)
      .single();
    config = data;
  }

  const email = config?.contact_email || 'contact@technologia.edu';
  const phone = config?.contact_phone || '+1 234 567 8900';

  return (
    <main className="min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-5xl font-black text-white mb-4">Get in <span className="text-primary">Touch</span></h1>
        <p className="text-white/60 mb-12 text-lg">Have questions about the fest? Reach out to our core team.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                <a href={`mailto:${email}`} className="text-white/60 hover:text-white transition-colors">{email}</a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                <a href={`tel:${phone}`} className="text-white/60 hover:text-white transition-colors">{phone}</a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                <p className="text-white/60">
                  Technologia Campus<br />
                  Main Auditorium Block<br />
                  Tech City, TC 10001
                </p>
              </div>
            </div>
          </div>

          <form className="glass-card p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Your Name</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Your Email</label>
              <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Message</label>
              <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="How can we help you?" />
            </div>

            <button type="button" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
