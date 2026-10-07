import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  asBottomSheetOnMobile?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  asBottomSheetOnMobile = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-5xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog / Mobile Bottom Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'relative w-full bg-white dark:bg-stone-900 shadow-2xl z-10 border border-stone-200 dark:border-stone-800 transition-all overflow-hidden flex flex-col',
          asBottomSheetOnMobile
            ? 'rounded-t-[2.5rem] sm:rounded-3xl max-h-[92vh] sm:max-h-[85vh] animate-slide-up sm:animate-scale-up'
            : 'rounded-3xl max-h-[85vh] animate-scale-up',
          maxWidths[maxWidth]
        )}
      >
        {/* Mobile handle indicator */}
        {asBottomSheetOnMobile && (
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 sm:p-6 pb-3 sm:pb-4 border-b border-stone-100 dark:border-stone-800 shrink-0">
            <div>
              {title && (
                <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 -mt-1 rounded-2xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Закрити"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
