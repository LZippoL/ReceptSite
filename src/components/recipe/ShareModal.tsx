import React from 'react';
import { Copy, Check, Send, Share2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  url
}) => {
  const [copied, setCopied] = React.useState(false);
  const { success } = useToast();
  const { t, language } = useLanguage();
  const shareUrl = url || window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    success(t('common.copied'), shareUrl);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        });
        onClose();
      } catch {
        // User cancelled share
      }
    }
  };

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const viberUrl = `viber://forward?text=${encodeURIComponent(`${title}\n${shareUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;

  const modalDesc = language === 'zh' 
    ? '将美味食谱分享给朋友或家人' 
    : language === 'de' 
    ? 'Teilen Sie dieses köstliche Rezept mit Freunden oder der Familie' 
    : language === 'en' 
    ? 'Share this delicious recipe with friends or family' 
    : 'Надішліть смачний рецепт друзям або близьким';

  const nativeBtnText = language === 'zh'
    ? '打开系统分享'
    : language === 'de'
    ? 'System-Freigabe'
    : language === 'en'
    ? 'System Share'
    : 'Відкрити меню смартфона';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('shareModal.title')}
      description={modalDesc}
    >
      <div className="space-y-4 pt-2">
        {/* Native Web Share button on phones if available */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <Button
            onClick={shareNative}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {nativeBtnText}
          </Button>
        )}

        {/* Copy link input */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-xs text-stone-600 dark:text-stone-300 font-mono px-2 outline-none select-all truncate"
          />
          <Button
            size="sm"
            onClick={handleCopyLink}
            variant={copied ? 'secondary' : 'primary'}
            className="shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                {t('common.copied')}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" />
                {t('shareModal.copyLink')}
              </>
            )}
          </Button>
        </div>

        {/* Social buttons */}
        <div className="space-y-2 pt-1">
          <p className="text-xs font-semibold text-stone-400">
            {t('shareModal.shareVia')}
          </p>
          <div className="grid grid-cols-4 gap-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 text-center font-semibold text-xs transition-colors flex flex-col items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              Telegram
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 text-center font-semibold text-xs transition-colors flex flex-col items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 text-center font-semibold text-xs transition-colors flex flex-col items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              Viber
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-center font-semibold text-xs transition-colors flex flex-col items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
