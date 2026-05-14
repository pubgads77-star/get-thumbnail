import { Search, Youtube, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface HeroInputProps {
  url: string;
  setUrl: (url: string) => void;
  onFetch: () => void;
  error: string | null;
  isRTL: boolean;
}

export const HeroInput = ({ url, setUrl, onFetch, error, isRTL }: HeroInputProps) => {
  const { t } = useTranslation();

  return (
    <section className="space-y-12 text-center lg:text-left">
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-zinc-900"
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-base md:text-xl max-w-xl mx-auto lg:mx-0 font-medium"
        >
          {t('hero.subtitle')}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group p-1 sm:p-1.5 bg-zinc-200/50 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-zinc-200/60 transition-all focus-within:ring-4 focus-within:ring-emerald-500/20"
      >
        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-[1.8rem] sm:rounded-[2.2rem] p-2 sm:p-3 shadow-inner">
          <div className="relative flex-grow">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onFetch()}
              placeholder={t('hero.input_placeholder')}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-[1.4rem] sm:rounded-[1.8rem] px-5 sm:px-6 py-4 sm:py-6 pl-12 sm:pl-14 focus:ring-0 focus:border-emerald-500/30 outline-none transition-all placeholder:text-zinc-300 text-zinc-900 text-lg sm:text-xl font-bold"
            />
            <Search className={cn(
              "absolute top-1/2 -translate-y-1/2 text-zinc-300 w-5 h-5 sm:w-6 sm:h-6 transition-colors group-focus-within:text-emerald-500",
              isRTL ? "right-5 sm:right-6" : "left-5 sm:left-6"
            )} />
          </div>
          <button 
            onClick={onFetch}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-[0.97] text-white font-black px-8 sm:px-12 py-4 sm:py-6 rounded-[1.4rem] sm:rounded-[1.8rem] transition-all flex items-center justify-center gap-2 emerald-glow whitespace-nowrap text-lg sm:text-xl animate-glow shadow-xl shadow-emerald-500/30"
          >
            {t('hero.button')}
          </button>
        </div>
      </motion.div>

      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 justify-center lg:justify-start px-8">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> youtube.com</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> youtu.be</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> shorts</span>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-red-400 text-sm font-medium justify-center lg:justify-start"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </section>
  );
};
