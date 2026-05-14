/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { extractVideoId, ThumbnailQuality } from './lib/youtube';
import { cn } from './lib/utils';
import { HeroInput } from './components/HeroInput';
import { ResultsView } from './components/ResultsView';
import { InfoSections } from './components/InfoSections';
import { LegalModals } from './components/LegalModals'; // استيراد ملف الصفحات القانونية
import { 
  History, 
  Coffee, 
  Globe, 
  Youtube,
  Trash2,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

const AdPlaceholder = ({ position }: { position: 'top' | 'sidebar' | 'bottom' | 'inline' }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(
      "bg-zinc-100 border border-zinc-200 flex flex-col items-center justify-center text-zinc-400 font-bold rounded-2xl overflow-hidden",
      position === 'top' && "w-full min-h-[90px] mb-8 border-dashed",
      position === 'sidebar' && "w-full aspect-square sticky top-24 border-dashed",
      position === 'bottom' && "w-full min-h-[250px] mt-20 border-dashed bg-zinc-50",
      position === 'inline' && "w-full p-6 rounded-3xl border-emerald-500/10 bg-emerald-500/5 text-emerald-600/40"
    )}>
      <div className="bg-zinc-200 px-3 py-1 rounded-full mb-2 text-zinc-500 text-[10px] uppercase tracking-widest">{t('ads.label')}</div>
      <div className="text-sm">{t('ads.placeholder')}</div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const { t, i18n } = useTranslation();
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<ThumbnailQuality>(ThumbnailQuality.MAXRES);
  const [history, setHistory] = useState<{ id: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  // حالة التحكم في الصفحات القانونية
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const savedHistory = localStorage.getItem('getThumbnail_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (id: string) => {
    const newHistory = [{ id }, ...history.filter(item => item.id !== id)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('getThumbnail_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('getThumbnail_history');
  };

  const handleFetch = () => {
    setError(null);
    const id = extractVideoId(url);
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
    } else if (url.trim() !== '') {
      setError(t('error.invalid_url'));
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleDownload = (format?: string) => {
    if (!videoId) return;
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    const downloadUrl = `/api/download?v=${videoId}&q=${selectedQuality}&f=${format || 'JPG'}`;
    window.location.href = downloadUrl;
  };

  const socialProof = (
    <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
       <div className="flex -space-x-3">
         {[1,2,3,4].map(i => (
           <div key={i} className="w-10 h-10 rounded-full border-2 border-[#fafafa] bg-zinc-200 overflow-hidden ring-2 ring-emerald-500/10">
             <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
           </div>
         ))}
       </div>
       <div className="space-y-0.5">
         <div className="flex items-center gap-1">
           {[1,2,3,4,5].map(i => (
             <div key={i} className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
           ))}
           <span className="text-sm font-black text-zinc-900 ml-2">4.9/5</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Trusted by 100k+ global creators</p>
       </div>
    </div>
  );

  const historySection = (
    <section className="bg-white border border-zinc-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 space-y-8 glass shadow-2xl shadow-zinc-200/20">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-zinc-900 flex items-center gap-3">
          <History className="w-5 h-5 text-emerald-600" />
          {t('recent.title')}
        </h3>
        {history.length > 0 && (
          <button onClick={clearHistory} className="p-2 text-zinc-400 hover:text-red-500 transition-colors bg-zinc-50 rounded-xl border border-zinc-200">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-8 sm:py-10 space-y-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
            <History className="w-8 h-8 text-zinc-200 mx-auto" />
            <p className="text-zinc-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{t('recent.empty')}</p>
          </div>
        ) : (
          history.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setUrl(`https://www.youtube.com/watch?v=${item.id}`);
                handleFetch();
              }}
              className="w-full flex items-center gap-4 p-2 rounded-2xl hover:bg-zinc-50 transition-all group text-left border border-zinc-100 hover:border-emerald-500/20 transform-gpu"
            >
              <div className="w-20 sm:w-28 aspect-video rounded-xl overflow-hidden bg-zinc-100 ring-1 ring-zinc-200 group-hover:ring-emerald-500/50 transition-all flex-shrink-0">
                <img 
                  src={`https://img.youtube.com/vi/${item.id}/default.jpg`} 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" 
                />
              </div>
              <div className="flex-grow overflow-hidden">
                <p className="text-[8px] sm:text-[9px] font-black text-emerald-600/40 uppercase tracking-widest mb-0.5 sm:mb-1">Asset ID</p>
                <p className="text-xs sm:text-sm font-mono text-zinc-500 truncate">{item.id}</p>
              </div>
            </motion.button>
          ))
        )}
      </div>
    </section>
  );

  return (
    <div className={cn(
      "min-h-screen bg-[#fafafa] bg-dots text-zinc-900 font-sans selection:bg-emerald-600/10",
      isRTL ? "font-arabic" : ""
    )} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-5 bg-zinc-900 text-white font-black rounded-[2rem] shadow-2xl flex items-center gap-4"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-zinc-900" />
            </div>
            {isRTL ? "تم بدء التحميل بنجاح" : "Download Started Successfully"}
          </motion.div>
        )}
      </AnimatePresence>
      
      <nav className="border-b border-zinc-200 bg-white/60 backdrop-blur-3xl sticky top-0 z-50 performance-optimized">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-24 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 group cursor-pointer overflow-hidden" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform shrink-0">
              <Youtube className="text-white w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <span className="font-black text-xl sm:text-3xl tracking-tighter text-zinc-900 italic truncate">{t('app.name')}</span>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 sm:gap-3 px-3.5 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-zinc-200 bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all text-[11px] sm:text-sm font-black shadow-sm active:scale-95 group shrink-0"
          >
            <Globe className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            <span className="uppercase tracking-widest">{i18n.language}</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AdPlaceholder position="top" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
          <div className="grid grid-cols-1 lg:col-span-8 space-y-16 sm:space-y-24">
            <HeroInput 
              url={url} 
              setUrl={setUrl} 
              onFetch={handleFetch} 
              error={error} 
              isRTL={isRTL} 
            />
            <div className="hidden lg:block">{socialProof}</div>

            <AnimatePresence mode="wait">
              {isTransitioning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-32 flex flex-col items-center justify-center space-y-8 bg-white rounded-[3.5rem] border border-zinc-100 shadow-2xl shadow-zinc-200/40"
                >
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
                    <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-xs">Super Engine Speed</p>
                    <p className="text-zinc-900 text-lg font-bold">Fetching Original Resolution...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div id="results-area">
              <AnimatePresence>
                {videoId && !isTransitioning && (
                  <ResultsView 
                    videoId={videoId} 
                    selectedQuality={selectedQuality} 
                    setSelectedQuality={setSelectedQuality} 
                    onDownload={handleDownload} 
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="lg:hidden">{historySection}</div>
            <div className="content-auto">
              <InfoSections />
            </div>
            <AdPlaceholder position="inline" />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-12 relative">
            <div className="hidden lg:block">{historySection}</div>
            <div className="lg:hidden">{socialProof}</div>
            <div className="order-1 lg:order-none lg:sticky lg:top-28 self-start w-full">
              <AdPlaceholder position="sidebar" />
            </div>
          </div>
        </div>
        <AdPlaceholder position="bottom" />
      </main>

      {/* Footer المطور */}
      <footer className="border-t border-zinc-100 py-20 mt-32 bg-white content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
               <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Youtube className="text-white w-6 h-6" />
                </div>
                <span className="font-black text-2xl tracking-tighter text-zinc-900 italic">{t('app.name')}</span>
              </div>
              <p className="text-zinc-400 text-sm font-medium max-w-xs leading-relaxed">
                {t('footer.built_with')} Professional engine for YouTube assets extraction.
              </p>
            </div>

            {/* روابط الصفحات القانونية وأزرار التبرع */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-6 text-sm font-bold text-zinc-400">
                <button onClick={() => setActiveModal('privacy')} className="hover:text-emerald-500 transition-colors">Privacy Policy</button>
                <button onClick={() => setActiveModal('terms')} className="hover:text-emerald-500 transition-colors">Terms of Service</button>
              </div>
              <a 
                href="https://buymeacoffee.com" 
                target="_blank" 
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-black text-white font-black transition-all shadow-xl active:scale-95 group"
              >
                <Coffee className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                {t('footer.coffee')}
              </a>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
             <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">{t('app.name')} AI Powered Engine</p>
             <p className="text-zinc-300 text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      {/* المكون الخاص بالنوافذ القانونية */}
      <LegalModals activeModal={activeModal} setActiveModal={setActiveModal} />
      
    </div>
  );
}