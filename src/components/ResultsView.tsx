import { Download, FileType, CheckCircle2, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { getThumbnailUrl, ThumbnailQuality, QUALITY_ORDER } from '../lib/youtube';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface ResultsViewProps {
  videoId: string;
  selectedQuality: ThumbnailQuality;
  setSelectedQuality: (q: ThumbnailQuality) => void;
  onDownload: (format: string) => void;
}

export const ResultsView = ({ videoId, selectedQuality, setSelectedQuality, onDownload }: ResultsViewProps) => {
  const { t } = useTranslation();
  const [format, setFormat] = useState('JPG');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (q: ThumbnailQuality) => {
    const url = getThumbnailUrl(videoId, q);
    navigator.clipboard.writeText(url);
    setCopiedId(q);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-zinc-200 rounded-[2.5rem] p-6 lg:p-12 space-y-12 glass shadow-2xl shadow-zinc-200/50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 sm:p-8 hidden sm:block">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Ultra Fast Engine
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 flex items-center gap-3 sm:gap-4">
          <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-emerald-500 rounded-full" />
          {t('preview.title')}
        </h2>
      </div>

      <div className="aspect-video w-full relative group rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-300/60 ring-2 sm:ring-4 ring-white performance-optimized">
        <img 
          src={getThumbnailUrl(videoId, selectedQuality)} 
          alt="Thumbnail" 
          className="w-full h-full object-cover transition-transform duration-1000"
          onError={() => {
            if (selectedQuality === ThumbnailQuality.MAXRES) {
              setSelectedQuality(ThumbnailQuality.SD);
            } else if (selectedQuality === ThumbnailQuality.SD) {
              setSelectedQuality(ThumbnailQuality.HQ);
            } else if (selectedQuality === ThumbnailQuality.HQ) {
              setSelectedQuality(ThumbnailQuality.DEFAULT);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 p-6 sm:p-10 flex items-end hidden sm:flex">
          <div className="space-y-1 sm:space-y-2 hidden sm:block">
             <div className="px-2 sm:px-3 py-1 rounded-lg bg-emerald-500 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest inline-block mb-1 sm:mb-2">
               {t(`quality.${selectedQuality}`)}
             </div>
             <p className="text-white text-xl sm:text-4xl font-black tracking-tight">Original Master Quality</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {t('preview.select_quality')}
          </p>
          <div className="flex flex-col gap-2 sm:gap-3">
            {QUALITY_ORDER.map((q) => (
              <div key={q} className="group relative flex gap-2">
                <button
                  onClick={() => setSelectedQuality(q)}
                  className={cn(
                    "flex-grow flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 rounded-[1.2rem] sm:rounded-[1.5rem] border transition-all text-xs sm:text-sm font-black",
                    selectedQuality === q 
                      ? "bg-zinc-900 border-zinc-900 text-white shadow-2xl shadow-zinc-300 scale-[1.02] z-10" 
                      : "bg-zinc-50/50 border-zinc-100 text-zinc-500 hover:border-emerald-500/30 hover:bg-white"
                  )}
                >
                  <span className="truncate">
  {q === 'maxresdefault' ? 'High Quality HD (1280x720)' :
   q === 'sddefault' ? 'Standard Definition (640x480)' :
   q === 'hqdefault' ? 'Normal Quality HQ (480x360)' :
   q === 'mqdefault' ? 'Medium Quality (320x180)' : 'Small Thumbnail'}
</span>
                  <div className={cn(
                    "w-2.5 h-2.5 min-w-[0.625rem] rounded-full transition-all duration-500",
                    selectedQuality === q ? "bg-emerald-500 scale-125 sm:scale-150 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-zinc-200 group-hover:bg-emerald-300"
                  )} />
                </button>
                <button 
                  onClick={() => handleCopyUrl(q)}
                  title={t('info.copy_url')}
                  className={cn(
                    "w-12 sm:w-14 shrink-0 rounded-[1.2rem] sm:rounded-[1.5rem] border flex items-center justify-center transition-all",
                    copiedId === q 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : "bg-white border-zinc-100 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500"
                  )}
                >
                  {copiedId === q ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-4 h-4 sm:w-5 h-5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400 flex items-center gap-3">
            <FileType className="w-4 h-4 text-emerald-500" />
            {t('info.export_format')}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {['JPG', 'PNG', 'WEBP', 'RAW'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={cn(
                  "flex items-center justify-center h-16 sm:h-20 rounded-[1.2rem] sm:rounded-[1.5rem] border-2 transition-all font-black text-base sm:text-lg active:scale-95",
                  format === fmt 
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20" 
                    : "bg-zinc-50 border-zinc-100 text-zinc-400 hover:border-emerald-200 hover:text-emerald-600 hover:bg-white"
                )}
              >
                {fmt}
              </button>
            ))}
          </div>
          <div className="p-4 sm:p-6 bg-zinc-50 border border-zinc-100 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500 font-black text-[10px] sm:text-xs shrink-0">
              4K
            </div>
            <div>
              <p className="text-zinc-900 font-bold text-xs sm:text-sm">Ultra High Fidelity</p>
              <p className="text-zinc-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Enhanced by Edge AI</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onDownload(format)}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 sm:py-7 rounded-[1.5rem] sm:rounded-[1.8rem] transition-all flex items-center justify-center gap-3 sm:gap-4 active:scale-[0.98] shadow-[0_20px_50px_-10px_rgba(16,185,129,0.4)] text-xl sm:text-2xl animate-glow"
      >
        <Download className="w-6 h-6 sm:w-8 h-8 animate-bounce" />
        {t('action.download')}
      </button>
    </motion.section>
  );
};
