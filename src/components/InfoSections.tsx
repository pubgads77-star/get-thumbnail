import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { 
  HelpCircle, 
  Info, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export const InfoSections = () => {
  const { t } = useTranslation();

  const faqs = [
    { q: t('info.faq_q1'), a: t('info.faq_a1') },
    { q: t('info.faq_q2'), a: t('info.faq_a2') },
    { q: t('info.faq_q3'), a: t('info.faq_a3') },
    { q: t('info.faq_q4'), a: t('info.faq_a4') },
  ];

  const steps = [
    { icon: <Layout className="w-6 h-6" />, title: t('info.how_to_step1') },
    { icon: <Zap className="w-6 h-6" />, title: t('info.how_to_step2') },
    { icon: <ShieldCheck className="w-6 h-6" />, title: t('info.how_to_step3') },
  ];

  return (
    <div className="space-y-20 sm:space-y-32">
      {/* How it Works */}
      <section className="space-y-8 sm:space-y-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-zinc-100">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">{t('info.how_to_title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 sm:p-8 bg-white border border-zinc-100 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-zinc-200/20 space-y-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-emerald-500 font-black">
                {idx + 1}
              </div>
              <p className="text-zinc-600 font-bold leading-relaxed text-sm sm:text-base">{step.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEO Content / About */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight">{t('info.seo_about_title')}</h2>
            <p className="text-zinc-500 text-base sm:text-lg leading-relaxed">
              {t('info.seo_about_text')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-zinc-900 font-black text-2xl sm:text-3xl">4K</p>
              <p className="text-zinc-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">Max Resolution</p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-zinc-900 font-black text-2xl sm:text-3xl">0ms</p>
              <p className="text-zinc-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">Wait Time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-900 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 text-white space-y-6 sm:space-y-8 shadow-2xl shadow-zinc-400/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <Zap className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>
          <div className="relative space-y-4 sm:space-y-6">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
            <h3 className="text-xl sm:text-2xl font-black">{t('info.privacy_title')}</h3>
            <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed">
              {t('info.privacy_text')}
            </p>
            <div className="flex items-center gap-2 sm:gap-3 text-emerald-400 text-[10px] sm:text-sm font-black uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 h-4" />
              Verified Edge Engine
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8 sm:space-y-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-zinc-100">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">{t('info.faq_title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 sm:p-8 bg-zinc-50 border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] space-y-3 sm:space-y-4">
              <h4 className="text-zinc-900 font-black text-base sm:text-lg flex items-start gap-3">
                <span className="text-emerald-500 mt-1">Q.</span>
                {faq.q}
              </h4>
              <p className="text-zinc-500 text-sm sm:text-base font-medium leading-relaxed sm:pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Details / Sizes */}
      <section className="bg-emerald-500 rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 lg:p-20 text-white space-y-8 sm:space-y-12 shadow-2xl shadow-emerald-500/30">
        <div className="max-w-2xl space-y-4 sm:space-y-6 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">Master Metadata Extraction.</h2>
          <p className="text-emerald-50/80 text-lg sm:text-xl font-medium leading-relaxed">
            Every YouTube video has multiple hidden assets. GetThumbnail automatically locates and exposes these direct CDN endpoints for you.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-emerald-400/50">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-sm font-black uppercase tracking-widest opacity-60">MaxRes</p>
            <p className="text-xl sm:text-2xl font-black">1280×720</p>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-sm font-black uppercase tracking-widest opacity-60">Standard</p>
            <p className="text-xl sm:text-2xl font-black">640×480</p>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-sm font-black uppercase tracking-widest opacity-60">High Quality</p>
            <p className="text-xl sm:text-2xl font-black">480×360</p>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-sm font-black uppercase tracking-widest opacity-60">Medium</p>
            <p className="text-xl sm:text-2xl font-black">320×180</p>
          </div>
        </div>
      </section>
    </div>
  );
};
