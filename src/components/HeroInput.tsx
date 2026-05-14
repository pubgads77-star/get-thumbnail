import { Search, Youtube, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const HeroInput = ({ url, setUrl, onFetch, error, isRTL }: any) => {
  return (
    <section className="space-y-12 text-center lg:text-left">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-zinc-900">
          Download YouTube Thumbnail
        </h1>
        <p className="text-zinc-500 text-base md:text-xl max-w-xl mx-auto lg:mx-0 font-medium">
          Extract original 4K assets from any YouTube video. Zero cost. Edge-powered delivery.
        </p>
      </div>

      <div className="relative group p-1 sm:p-1.5 bg-zinc-200/50 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl transition-all focus-within:ring-4 focus-within:ring-emerald-500/20">
        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-[1.8rem] p-2 shadow-inner">
          <div className="relative flex-grow">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onFetch()}
              placeholder="Paste YouTube URL here..."
              className="w-full bg-zinc-50 border border-zinc-100 rounded-[1.4rem] px-5 py-4 pl-12 focus:ring-0 outline-none font-bold"
            />
            <Search className="absolute top-1/2 -translate-y-1/2 left-5 text-zinc-300 w-5 h-5" />
          </div>
          <button onClick={onFetch} className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-4 rounded-[1.4rem] transition-all whitespace-nowrap">
            Fetch Assets
          </button>
        </div>
      </div>
      <div className="flex gap-4 text-[10px] font-black uppercase text-zinc-300 justify-center lg:justify-start px-4">
        <span>youtube.com</span> <span>youtu.be</span> <span>shorts</span>
      </div>
      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
    </section>
  );
};