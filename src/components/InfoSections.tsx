import { ShieldCheck, Zap, HelpCircle, Smartphone, Globe, Award } from 'lucide-react';

export const InfoSections = () => {
  return (
    <div className="space-y-24 mt-16">
      {/* How to Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-3 text-zinc-900">
          <Smartphone className="text-emerald-500 w-6 h-6"/> 
          How to Download YouTube Thumbnails
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black mb-4">1</div>
            <p className="text-zinc-700 font-bold">Copy the YouTube video URL from your browser or app.</p>
          </div>
          <div className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black mb-4">2</div>
            <p className="text-zinc-700 font-bold">Paste the link into the GetThumbnail input box above.</p>
          </div>
          <div className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black mb-4">3</div>
            <p className="text-zinc-700 font-bold">Choose your preferred quality (4K/HD) and click Download.</p>
          </div>
        </div>
      </section>

      {/* About / Why Us Section */}
      <section className="bg-zinc-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
        <Zap className="absolute top-0 right-0 w-64 h-64 text-emerald-500/10 -mr-20 -mt-20 rotate-12" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-black mb-6">Why Professional Creators Choose GetThumbnail?</h2>
          <p className="text-zinc-400 leading-relaxed text-lg mb-8">
            GetThumbnail is the world's fastest engine designed specifically for designers and YouTube creators. Unlike other tools, we extract the <span className="text-emerald-400 font-bold">original master file</span> directly from YouTube's CDN servers. This ensures you get 4K resolution with zero compression loss.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-2 text-sm font-bold"><Award className="text-emerald-500 w-5 h-5"/> No Watermarks</div>
            <div className="flex items-center gap-2 text-sm font-bold"><Globe className="text-emerald-500 w-5 h-5"/> Global CDN Speed</div>
            <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="text-emerald-500 w-5 h-5"/> 100% Private</div>
            <div className="flex items-center gap-2 text-sm font-bold"><Zap className="text-emerald-500 w-5 h-5"/> Instant Fetch</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-3 text-zinc-900 mb-4">
          <HelpCircle className="text-emerald-500 w-6 h-6"/> 
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem] space-y-3">
            <h4 className="font-black text-zinc-900 text-lg">Is it legal to download YouTube thumbnails?</h4>
            <p className="text-zinc-600 text-sm leading-relaxed">Yes, thumbnails are public metadata. However, they are owned by the creator. You should seek permission for any commercial reuse.</p>
          </div>
          <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem] space-y-3">
            <h4 className="font-black text-zinc-900 text-lg">Can I download 4K YouTube thumbnails?</h4>
            <p className="text-zinc-600 text-sm leading-relaxed">Absolutely! If the creator uploaded a high-res image, GetThumbnail will fetch the original 1280x720 (HD) or 1920x1080 resolution for you.</p>
          </div>
          <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem] space-y-3">
            <h4 className="font-black text-zinc-900 text-lg">Does this work on mobile devices?</h4>
            <p className="text-zinc-600 text-sm leading-relaxed">Yes. Our platform is fully responsive and works perfectly on iPhone, Android, and tablets without any app installation.</p>
          </div>
          <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem] space-y-3">
            <h4 className="font-black text-zinc-900 text-lg">Do I need to login to save thumbnails?</h4>
            <p className="text-zinc-600 text-sm leading-relaxed">No login or registration is required. We believe in a fast, friction-less experience for all users.</p>
          </div>
        </div>
      </section>
    </div>
  );
};