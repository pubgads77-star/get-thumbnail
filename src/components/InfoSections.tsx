import { ShieldCheck, Zap, HelpCircle, Smartphone } from 'lucide-react';

export const InfoSections = () => {
  return (
    <div className="space-y-20">
      <section className="space-y-8">
        <h2 className="text-2xl font-black flex items-center gap-3"><Smartphone className="text-emerald-500"/> How to Download</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
            <span className="text-emerald-500 font-black">1.</span> Copy the YouTube video URL.
          </div>
          <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
            <span className="text-emerald-500 font-black">2.</span> Paste it into the box above.
          </div>
          <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
            <span className="text-emerald-500 font-black">3.</span> Choose the quality and format, and click download..
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 rounded-[2.5rem] p-10 text-white">
        <h2 className="text-3xl font-black mb-4">Professional Creators Choice</h2>
        <p className="text-zinc-400 leading-relaxed">
          GetThumbnail extracts the original master file directly from Google's CDN servers, ensuring zero quality loss for your designs.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black flex items-center gap-3"><HelpCircle className="text-emerald-500"/> FAQ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-zinc-50 rounded-2xl">
            <h4 className="font-black mb-2">Is it free?</h4>
            <p className="text-zinc-500 text-sm">Yes, 100% free and always will be.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl">
            <h4 className="font-black mb-2">HD Quality?</h4>
            <p className="text-zinc-500 text-sm">We provide the highest resolution available for the video.</p>
          </div>
        </div>
      </section>
    </div>
  );
};