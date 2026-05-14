/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GetThumbnail - Final English Production Version
 */

import { useState, useEffect } from 'react';
import { extractVideoId, ThumbnailQuality } from './lib/youtube';
import { cn } from './lib/utils';
import { HeroInput } from './components/HeroInput';
import { ResultsView } from './components/ResultsView';
import { InfoSections } from './components/InfoSections';
import { 
  History, 
  Coffee, 
  Youtube,
  Trash2,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Internal Legal Modal Component ---
const LegalModal = ({ title, isOpen, onClose, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-glow">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <h2 className="text-xl font-black text-zinc-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-zinc-500" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto text-zinc-600 leading-relaxed text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Ad Placeholder Component ---
const AdPlaceholder = ({ position }: { position: 'top' | 'sidebar' | 'bottom' | 'inline' }) => {
  return (
    <div className={cn(
      "bg-zinc-100 border border-zinc-200 flex flex-col items-center justify-center text-zinc-400 font-bold rounded-2xl overflow-hidden",
      position === 'top' && "w-full min-h-[90px] mb-8 border-dashed",
      position === 'sidebar' && "w-full aspect-square sticky top-24 border-dashed",
      position === 'bottom' && "w-full min-h-[250px] mt-20 border-dashed bg-zinc-50",
      position === 'inline' && "w-full p-6 rounded-3xl border-emerald-500/10 bg-emerald-500/5 text-emerald-600/40"
    )}>
      <div className="bg-zinc-200 px-3 py-1 rounded-full mb-2 text-zinc-500 text-[10px] uppercase tracking-widest">ADVERTISEMENT</div>
      <div className="text-sm font-medium italic">Your AdSense Slot Here</div>
    </div>
  );
};

export default function App() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<ThumbnailQuality>(ThumbnailQuality.MAXRES);
  const [history, setHistory] = useState<{ id: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Force Scroll to Top on reload
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
      setError("Invalid YouTube URL. Please check the link.");
    }
  };

  const handleDownload = (format?: string) => {
    if (!videoId) return;
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    window.location.href = `/api/download?v=${videoId}&q=${selectedQuality}&f=${format || 'JPG'}`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] bg-dots text-zinc-900 font-sans selection:bg-emerald-600/10">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-5 bg-zinc-900 text-white font-black rounded-[2rem] shadow-2xl flex items-center gap-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-zinc-900" /></div>
            Download Started Successfully
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navbar */}
      <nav className="border-b border-zinc-200 bg-white/60 backdrop-blur-3xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-24 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Youtube className="text-white w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <span className="font-black text-xl sm:text-3xl tracking-tighter italic">GetThumbnail</span>
          </div>
          <a href="mailto:pubgads77@gmail.com" className="text-xs sm:text-sm font-black bg-zinc-100 px-4 py-2 rounded-xl hover:bg-zinc-200 transition-all">Contact Support</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AdPlaceholder position="top" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <HeroInput 
                url={url} 
                setUrl={setUrl} 
                onFetch={handleFetch} 
                error={error} 
                isRTL={false} 
            />

            {isTransitioning && (
              <div className="py-20 flex flex-col items-center bg-white rounded-[3rem] border border-zinc-100 shadow-xl">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-zinc-500 font-bold">Fetching High Quality Assets...</p>
              </div>
            )}

            <div id="results-area">
              {videoId && !isTransitioning && (
                <ResultsView 
                  videoId={videoId} 
                  selectedQuality={selectedQuality} 
                  setSelectedQuality={setSelectedQuality} 
                  onDownload={handleDownload} 
                />
              )}
            </div>

            <InfoSections />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <section className="bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-xl">
              <h3 className="font-bold mb-6 flex items-center gap-2"><History className="w-5 h-5 text-emerald-600" /> Recent Exports</h3>
              <div className="space-y-4">
                {history.length === 0 ? <p className="text-zinc-400 text-xs italic">No history yet.</p> : history.map((item) => (
                  <button key={item.id} onClick={() => { setUrl(`https://youtube.com/watch?v=${item.id}`); handleFetch(); }} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all text-left group">
                    <img src={`https://img.youtube.com/vi/${item.id}/default.jpg`} className="w-16 aspect-video rounded-lg object-cover" alt="prev" />
                    <span className="text-xs font-mono text-zinc-500 truncate group-hover:text-emerald-600">ID: {item.id}</span>
                  </button>
                ))}
              </div>
            </section>
            <AdPlaceholder position="sidebar" />
          </aside>
        </div>
      </main>

      <footer className="border-t border-zinc-100 py-8 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <span className="font-black text-xl italic text-emerald-600">GetThumbnail</span>
            <p className="text-zinc-800 text-sm max-w-sm font-bold">The professional engine for original YouTube assets extraction at full fidelity.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-black text-zinc-900">
  <button onClick={() => setActiveModal('privacy')} className="hover:text-emerald-600 transition-colors underline underline-offset-4">Privacy Policy</button>
  <button onClick={() => setActiveModal('terms')} className="hover:text-emerald-600 transition-colors underline underline-offset-4">Terms of Service</button>
  <button onClick={() => setActiveModal('contact')} className="hover:text-emerald-600 transition-colors underline underline-offset-4">Contact Us</button>
</div>
        </div>
      </footer>

      <LegalModal title="Privacy Policy" isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)}>
        <div className="space-y-6 text-zinc-800 font-medium">
          <p>
            At <span className="font-black text-emerald-600">GetThumbnail</span>, accessible from your current URL, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GetThumbnail and how we use it.
          </p>

          <section className="space-y-2">
            <h3 className="font-black text-zinc-900 border-b border-zinc-100 pb-1 uppercase text-xs tracking-widest">1. Data Collection</h3>
            <p>
              We do not store any personal data, video links, or processed images on our servers. All thumbnail extractions are performed in real-time using secure edge functions and are delivered directly to your browser session.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-black text-zinc-900 border-b border-zinc-100 pb-1 uppercase text-xs tracking-widest">2. Google AdSense & Cookies</h3>
            <p>
              Google is one of the third-party vendors on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. You may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-black text-zinc-900 border-b border-zinc-100 pb-1 uppercase text-xs tracking-widest">3. Log Files</h3>
            <p>
              GetThumbnail follows a standard procedure of using log files. These files log visitors when they visit websites. This is part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, and date/time stamps.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-black text-zinc-900 border-b border-zinc-100 pb-1 uppercase text-xs tracking-widest">4. Contact Support</h3>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our official support email:
            </p>
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 mt-2 flex items-center justify-center">
              <span className="font-black text-emerald-600 text-lg select-all">pubgads77@gmail.com</span>
            </div>
          </section>

          <p className="text-[10px] text-zinc-400 text-center pt-4 uppercase tracking-tighter">
            Last Updated: May 2024 | GetThumbnail Asset Engine
          </p>
        </div>
      </LegalModal>

      <LegalModal title="Terms of Service" isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)}>
        <div className="space-y-4">
          <p>1. <strong>Usage:</strong> This tool is provided for personal and educational use only.</p>
          <p>2. <strong>Intellectual Property:</strong> All thumbnails are the property of their respective creators. You should seek permission before using them commercially.</p>
          <p>3. <strong>Disclaimer:</strong> GetThumbnail is not affiliated with YouTube or Google. We provide the service "as-is".</p>
        </div>
      </LegalModal>

      <LegalModal title="Contact Us" isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)}>
  <div className="space-y-6 text-center">
    <p className="text-zinc-800 font-medium">Have a question or feedback? We'd love to hear from you!</p>
    <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
      <p className="text-xs uppercase font-black text-emerald-600 tracking-widest mb-2">Official Support Email</p>
      <a href="mailto:pubgads77@gmail.com" className="text-2xl font-black text-zinc-900 hover:text-emerald-600 transition-colors">pubgads77@gmail.com</a>
    </div>
    <p className="text-zinc-400 text-xs text-center">We usually respond within 24-48 hours.</p>
  </div>
      </LegalModal>
    </div>
  );
}