import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
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

export const LegalModals = ({ 
  activeModal, 
  setActiveModal 
}: { 
  activeModal: string | null; 
  setActiveModal: (val: string | null) => void 
}) => {
  return (
    <>
      <Modal 
        title="Privacy Policy | سياسة الخصوصية" 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-4">
          <p>At GetThumbnail, we respect your privacy. We do not store any video links or personal data.</p>
          <p>في GetThumbnail، نحن نحترم خصوصيتك. نحن لا نقوم بتخزين أي روابط فيديوهات أو بيانات شخصية للمستخدمين.</p>
          <h3 className="font-bold text-zinc-900">Google AdSense</h3>
          <p>This site may use Google AdSense to display ads, which uses cookies to serve ads based on your visits.</p>
          <p>قد يستخدم هذا الموقع جوجل أدسنس لعرض الإعلانات، والذي يستخدم ملفات تعريف الارتباط لعرض الإعلانات بناءً على زياراتك.</p>
        </div>
      </Modal>

      <Modal 
        title="Terms of Service | شروط الخدمة" 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-4">
          <p>By using GetThumbnail, you agree to use the downloaded content for personal and educational purposes only.</p>
          <p>باستخدامك لـ GetThumbnail، فإنك توافق على استخدام المحتوى المحمل للأغراض الشخصية والتعليمية فقط.</p>
          <p>All YouTube assets are the property of their respective creators.</p>
          <p>جميع حقوق الصور تعود لأصحابها الأصليين على يوتيوب.</p>
        </div>
      </Modal>
    </>
  );
};