import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: imagesData } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('type', 'image')
    .order('created_at', { ascending: false });

  const images = imagesData || [];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-5xl font-black text-white mb-12">Photo <span className="text-primary">Gallery</span></h1>
        
        {images.length === 0 ? (
          <div className="glass-card p-16 text-center text-white/50 flex flex-col items-center">
            <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
            <p>No images have been uploaded to the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img: any) => (
              <div key={img.id} className="group relative rounded-3xl overflow-hidden glass aspect-square">
                <img 
                  src={img.url} 
                  alt={'Gallery Image'} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {img.tags && img.tags.length > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-medium">{img.tags.join(', ')}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
