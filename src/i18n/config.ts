import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app.name": "GetThumbnail",
      "hero.title": "Download YouTube Thumbnail",
      "hero.subtitle": "Extract original 4K assets from any YouTube video. Zero cost. Edge-powered delivery.",
      "hero.input_placeholder": "Paste YouTube URL...",
      "hero.button": "Fetch Assets",
      "preview.title": "Source Preview",
      "preview.select_quality": "Resolution Engine",
      "quality": {
        "maxresdefault": "High Quality HD (1280x720)",
        "sddefault": "Standard Definition (640x480)",
        "hqdefault": "Normal Quality HQ (480x360)",
        "mqdefault": "Medium Quality (320x180)",
        "default": "Small Thumbnail (120x90)"
      },
      "action.download": "Download Assets",
      "recent.title": "Recent Exports",
      "recent.empty": "History is empty.",
      "footer.built_with": "Engineered for speed.",
      "footer.coffee": "Support Development",
      "ads.label": "ADVERTISEMENT",
      "ads.placeholder": "AdSense Slot",
      "info.how_to_title": "How to Download",
      "info.how_to_step1": "Copy the YouTube video URL from your browser.",
      "info.how_to_step2": "Paste the URL into the input box above.",
      "info.how_to_step3": "Choose resolution and format, then click Download.",
      "info.faq_title": "Frequently Asked Questions",
      "info.faq_q1": "Is it legal to download thumbnails?",
      "info.faq_a1": "Yes, thumbnails are public metadata. However, they are owned by the creator, so seek permission for commercial reuse.",
      "info.faq_q2": "What sizes are available?",
      "info.faq_a2": "We provide HD (1280x720), SD (640x480), and lower resolutions like HQ and MQ depending on the video.",
      "info.faq_q3": "Does this work on mobile?",
      "info.faq_a3": "Absolutely. GetThumbnail is fully responsive and works on any Android, iOS, or Tablet device.",
      "info.faq_q4": "Is reusing thumbnails SEO friendly?",
      "info.faq_a4": "Generally no, as Google indexes them. However, you can modify them (add effects/text) to make them unique and SEO-ready again.",
      "info.seo_about_title": "Why Professional Creators Choose GetThumbnail",
      "info.seo_about_text": "GetThumbnail is more than just a downloader; it's a precision tool for designers. We extract the original master file directly from Google's CDN servers, bypassing compression.",
      "info.privacy_title": "100% Private & Secure",
      "info.privacy_text": "We don't log your requests. Everything happens instantly and privately.",
      "info.copy_url": "Copy URL",
      "info.copied": "Copied!",
      "info.export_format": "Export Format",
      "seo.title": "Edge Image Extraction",
      "seo.p1": "GetThumbnail utilizes custom Edge routes to bypass cross-origin restrictions, allowing creators to fetch raw thumbnail assets directly from server-side infrastructure.",
      "seo.p2": "Our stack is optimized for high-performance creative workflows, ensuring that you get the highest available resolution for every single video without quality loss.",
      "error.invalid_url": "Invalid Endpoint URL.",
      "error.fetch_failed": "Handshake failed."
    }
  },
  ar: {
    translation: {
      "app.name": "GetThumbnail",
      "hero.title": "تحميل صور يوتيوب المصغرة",
      "hero.subtitle": "استخرج الصور المصغرة بجودتها الكاملة من خوادم يوتيوب مباشرة. سرعة فائقة وبدون تكاليف.",
      "hero.input_placeholder": "أدخل رابط اليوتيوب...",
      "hero.button": "استخراج الصورة",
      "preview.title": "معاينة الملف",
      "preview.select_quality": "خيارات الدقة المتاحة",
      "quality": {
        "maxresdefault": "دقة عالية HD (1280x720)",
        "sddefault": "دقة قياسية SD (640x480)",
        "hqdefault": "دقة متوسطة HQ (480x360)",
        "mqdefault": "دقة منخفضة (320x180)",
        "default": "صورة مصغرة (120x90)"
      },
      "action.download": "تحميل الصورة الآن",
      "recent.title": "السجل الأخير",
      "recent.empty": "لا يوجد سجل عمليات حالياً.",
      "footer.built_with": "محرك استخراج متطور لسرعة البرق.",
      "footer.coffee": "دعم تطوير المشروع",
      "ads.label": "إعلان",
      "ads.placeholder": "مساحة إعلانية",
      "info.how_to_title": "كيفية التحميل",
      "info.how_to_step1": "انسخ رابط فيديو اليوتيوب من المتصفح.",
      "info.how_to_step2": "الصق الرابط في مربع الإدخال أعلاه.",
      "info.how_to_step3": "اختر الدقة والصيغة المطلوبة، ثم اضغط تحميل.",
      "info.faq_title": "الأسئلة الشائعة",
      "info.faq_q1": "هل من القانوني تحميل هذه الصور؟",
      "info.faq_a1": "نعم، الصور المصغرة هي بيانات وصفية عامة. ومع ذلك، فهي ملك للمبدع، لذا اطلب الإذن لإعادة الاستخدام التجاري.",
      "info.faq_q2": "ما هي الأحجام المتاحة؟",
      "info.faq_a2": "نوفر دقة HD (1280x720) و SD (640x480) ودقات أقل حسب توافرها في الفيديو الأصلي.",
      "info.faq_q3": "هل يعمل الموقع على الهاتف؟",
      "info.faq_a3": "بكل تأكيد. GetThumbnail متوافق تماماً مع جميع أجهزة أندرويد و آيفون والأجهزة اللوحية.",
      "info.faq_q4": "هل إعادة استخدام الصور المصغرة صديق للسيو (SEO)؟",
      "info.faq_a4": "بشكل عام لا، لأن جوجل يقوم بفهرستها. لكن يمكنك تعديلها وإضافة تأثيرات لجعلها فريدة مما يجعلها صديقة لمحركات البحث مجدداً.",
      "info.seo_about_title": "لماذا يختار المحترفون GetThumbnail؟",
      "info.seo_about_text": "GetThumbnail ليس مجرد موقع تحميل؛ إنه أداة دقيقة للمصممين. نحن نستخرج ملف المصدر الأصلي مباشرة من خوادم جوجل دون أي ضغط.",
      "info.privacy_title": "خصوصية وأمان 100%",
      "info.privacy_text": "نحن لا نقوم بتسجيل طلباتك. كل شيء يتم بشكل فوري وخاص تماماً.",
      "info.copy_url": "نسخ الرابط",
      "info.copied": "تم النسخ!",
      "info.export_format": "صيغة التصدير",
      "seo.title": "تحميل صور يوتيوب المصغرة بالدقة الأصلية",
      "seo.p1": "يوفر GetThumbnail وصولاً مباشراً إلى الأصول الأصلية للفيديوهات عبر تقنيات Edge المتطورة لتجاوز قيود المتصفح والوصول للجودة الخام.",
      "seo.p2": "منصة مثالية للمصممين ومنشئي المحتوى للحصول على أفضل جودة ممكنة للصور المصغرة لأي فيديو يوتيوب بضغطة واحدة وبسرعة استثنائية.",
      "error.invalid_url": "رابط الفيديو غير صالح.",
      "error.fetch_failed": "فشل الاتصال."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('i18nextLng') || undefined,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    }
  });

export default i18n;
