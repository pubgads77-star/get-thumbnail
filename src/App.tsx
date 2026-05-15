/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GetThumbnail - Final English Version with Full Adsterra Integration
 */

import React, { useState, useEffect, useRef } from 'react';
import { extractVideoId, ThumbnailQuality } from './lib/youtube';
import { cn } from './lib/utils';
import { HeroInput } from './components/HeroInput';
import { ResultsView } from './components/ResultsView';
import { InfoSections } from './components/InfoSections';
import { 
  History, 
  Youtube,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- مكون عام لتشغيل أي بنر إعلاني من أدستيرا ---
const AdsterraBanner = ({ id, width, height, className }: { id: string, width: number, height: number, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.firstChild) {
      const scriptOptions = document.createElement('script');
      scriptOptions.type = 'text/javascript';
      scriptOptions.innerHTML = `
        atOptions = {
          'key' : '${id}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = `https://www.highperformanceformat.com/${id}/invoke.js`;
      
      containerRef.current.appendChild(scriptOptions);
      containerRef.current.appendChild(scriptInvoke);
    }
  }, [id, width, height]);

  return <div ref={containerRef} className={cn("flex justify-center items-center overflow-hidden mx-auto", className)} />;
};

// --- مكون لتشغيل الإعلانات غير المرئية (SocialBar & Popunder) ---
const GlobalAds = () => {
  useEffect(() => {
    // تشغيل SocialBar
    const socialBar = document.createElement('script');
    socialBar.src = "https://pl29450616.profitablecpmratenetwork.com/4a/cb/d3/4acbd3bf74ff439f2cc7fe5e42cc2329.js";
    socialBar.async = true;
    document.body.appendChild(socialBar);

    // تشغيل Popunder
    const popunder = document.createElement('script');
    popunder.src = "https://pl29450608.profitablecpmratenetwork.com/5f/d3/93/5fd3930cb73863c526b1c9ce578ab2f8.js";
    popunder.async = true;
    document.body.appendChild(popunder);
  }, []);

  return null;
};

// --- Ad Placeholder Wrapper ---
const AdWrapper = ({ children, position }: { children: React.ReactNode, position: 'top' | 'sidebar' }) => (
  <div className={cn(
    "flex items-center justify-center overflow-hidden",
    position === 'top' && "w-full mb-8 min-h-[50px] sm:min-h-[90px]",
    position === 'sidebar' && "w-full aspect-square sticky top-24 bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl"
  )}>
    {children}
  </div>
);

export default function App() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<ThumbnailQuality>(ThumbnailQuality.MAXRES);
  const [history, setHistory] = useState<{ id: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedHistory = localStorage.getItem('getThumbnail_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (id: string) => {
    const newHistory = [{ id }, ...history.filter(item => item.id !== id)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('getThumbnail_history', JSON.stringify(newHistory));
  };

  const handleFetch = (customUrl?: string) => {
    const targetUrl = customUrl || url;
    setError(null);
    const id = extractVideoId(targetUrl);
    if (id) {
      setIsTransitioning(true);
      setTimeout(() => {
        setVideoId(id);
        saveToHistory(id);
        setSelectedQuality(ThumbnailQuality.MAXRES);
        setIsTransitioning(false);
        setTimeout(() => {
          document.getElementById('results-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }, 800);
    } else if (targetUrl.trim() !== '') {
      setError("Invalid YouTube URL.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] bg-dots text-zinc-900 font-sans">
      <GlobalAds /> {/* تشغيل SocialBar و Popunder تلقائياً */}

      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-5 bg-zinc-900 text-white font-black rounded-[2rem] shadow-2xl flex items-center gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Download Started
          </motion.div>
        )}
      </AnimatePresence>
      
      <nav className="border-b border-zinc-200 bg-white/60 backdrop-blur-3xl sticky top-0 z-50 h-16 sm:h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"><Youtube className="text-white" /></div>
            <span className="font-black text-xl italic tracking-tighter">GetThumbnail</span>
          </div>
          <a href="mailto:pubgads77@gmail.com" className="text-xs font-black bg-zinc-100 px-4 py-2 rounded-xl">Support</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Top Ad - Responsive Banner */}
        <AdWrapper position="top">
            {/* للكمبيوتر يظهر 728x90 وللموبايل يظهر 320x50 */}
            <div className="hidden sm:block">
              <AdsterraBanner id="60ef3bd39b8d3bfe2c8256a3078c2a88" width={728} height={90} />
            </div>
            <div className="sm:hidden">
              <AdsterraBanner id="b77f6856d894549a60090ecdbe2b8467" width={320} height={50} />
            </div>
        </AdWrapper>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <HeroInput url={url} setUrl={setUrl} onFetch={() => handleFetch()} error={error} isRTL={false} />

            {isTransitioning && (
              <div className="py-20 flex flex-col items-center bg-white rounded-[3rem] border border-zinc-100">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-zinc-500 font-bold">Processing Assets...</p>
              </div>
            )}

            <div id="results-area">
              {videoId && !isTransitioning && (
                <ResultsView videoId={videoId} selectedQuality={selectedQuality} setSelectedQuality={setSelectedQuality} onDownload={() => setShowToast(true)} />
              )}
            </div>

            <InfoSections />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <section className="bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-zinc-400 text-sm italic">Recent Downloads</h3>
              <div className="space-y-4">
                {history.map((item) => (
                  <button key={item.id} onClick={() => { setUrl(`https://youtube.com/watch?v=${item.id}`); handleFetch(`https://youtube.com/watch?v=${item.id}`); }} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-all text-left group">
                    <img src={`https://img.youtube.com/vi/${item.id}/default.jpg`} className="w-16 aspect-video rounded-lg object-cover" alt="history" />
                    <span className="text-[10px] font-mono text-zinc-400 group-hover:text-emerald-600">ID: {item.id}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Sidebar Square Ad */}
            <AdWrapper position="sidebar">
               <AdsterraBanner id="997aff01df7a900175fc4138582ad01f" width={300} height={250} />
            </AdWrapper>
          </aside>
        </div>
      </main>

      <footer className="border-t border-zinc-100 py-12 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <span className="font-black text-xl italic text-emerald-600">GetThumbnail</span>
          <div className="flex justify-center gap-6 text-xs font-black text-zinc-400 uppercase tracking-widest">
            <button onClick={() => setActiveModal('privacy')}>Privacy</button>
            <button onClick={() => setActiveModal('terms')}>Terms</button>
          </div>
          <p className="text-[10px] text-zinc-300">© 2024 Asset Extraction Engine</p>
        </div>
      </footer>

      {/* Modal Example */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-[2rem] max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 bg-zinc-100 rounded-full"><X className="w-4 h-4" /></button>
              <h2 className="text-xl font-black mb-4 uppercase italic">{activeModal} Policy</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">This service provides YouTube thumbnail extraction for educational purposes. All assets are property of their respective owners.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}