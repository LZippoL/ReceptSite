import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle, CloudOff, CheckCircle2, UserCheck, Heart } from 'lucide-react';

export const GuestSaveWarningModal: React.FC = () => {
  const { isGuestWarningOpen, closeGuestWarning, openAuthModal } = useAuth();
  const [dontShowAgainSession, setDontShowAgainSession] = useState(false);

  if (!isGuestWarningOpen) return null;

  const handleOpenAuth = () => {
    closeGuestWarning();
    openAuthModal('register');
  };

  const handleDismiss = () => {
    if (dontShowAgainSession) {
      sessionStorage.setItem('smakolyk_guest_warning_dismissed', 'true');
    }
    closeGuestWarning();
  };

  return (
    <Modal
      isOpen={isGuestWarningOpen}
      onClose={handleDismiss}
      maxWidth="md"
    >
      <div className="space-y-6 text-center">
        {/* Animated Badge Icon */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-md">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Рецепт додано до улюблених</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Збережено лише на цьому пристрої!
          </h3>
        </div>

        {/* Warning card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-left space-y-3">
          <div className="flex items-start gap-3">
            <CloudOff className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              <strong className="text-stone-900 dark:text-stone-100 block mb-1">
                Ви користуєтеся сайтом як гість (без профілю).
              </strong>
              Якщо ви <span className="font-semibold text-rose-600 dark:text-rose-400">очистите кеш браузера</span>, скористаєтеся режимом «інкогніто» або відкриєте сайт з <span className="font-semibold text-stone-900 dark:text-stone-100">іншого браузера чи телефона</span> — збережені рецепти буде втрачено.
            </div>
          </div>
          <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-center gap-1.5">
            <span>✨</span>
            <span>Зареєструйтеся безкоштовно за 1 хвилину, щоб зберегти улюблені страви назавжди!</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-1">
          <Button
            type="button"
            variant="primary"
            onClick={handleOpenAuth}
            className="w-full h-12 rounded-2xl text-sm font-bold shadow-md shadow-brand-500/25 flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Увійти або зареєструватися</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleDismiss}
            className="w-full text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          >
            Зрозуміло, продовжити як гість
          </Button>
        </div>

        {/* Session dismissal checkbox */}
        <div className="pt-1 flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="dontShowSession"
            checked={dontShowAgainSession}
            onChange={(e) => setDontShowAgainSession(e.target.checked)}
            className="rounded border-stone-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5 cursor-pointer"
          />
          <label htmlFor="dontShowSession" className="text-[11px] text-stone-500 dark:text-stone-400 select-none cursor-pointer">
            Більше не показувати це попередження сьогодні
          </label>
        </div>
      </div>
    </Modal>
  );
};
