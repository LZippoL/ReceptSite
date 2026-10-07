import React from 'react';
import { Copy, Check, Send, Share2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

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
  const shareUrl = url || window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    success('Скопійовано', 'Посилання збережено в буфер обміну');
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Поділитися рецептом"
      description="Надішліть смачний рецепт друзям або близьким"
    >
      <div className="space-y-4 pt-2">
        {/* Native Web Share button on phones if available */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <Button
            onClick={shareNative}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Відкрити меню смартфона
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
                Скопійовано
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" />
                Копіювати
              </>
            )}
          </Button>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          {/* Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">Telegram</span>
          </a>

          {/* Viber */}
          <a
            href={viberUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:scale-105 transition-transform"
          >
            <span className="text-lg leading-none mb-1">🟣</span>
            <span className="text-xs font-semibold">Viber</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:scale-105 transition-transform"
          >
            <span className="text-lg leading-none mb-1 font-bold">f</span>
            <span className="text-xs font-semibold">Facebook</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
