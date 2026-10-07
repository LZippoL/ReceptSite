import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';

interface CookingTimerProps {
  initialMinutes: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  autoStart?: boolean;
}

export const CookingTimer: React.FC<CookingTimerProps> = ({
  initialMinutes,
  label,
  size = 'md',
  autoStart = false
}) => {
  const { t } = useLanguage();
  const totalSeconds = initialMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isFinished, setIsFinished] = useState(false);

  // Play beep sound using Web Audio API (reliable offline & without external assets)
  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playAlertSound();
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 }
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFinished) {
      setSecondsLeft(totalSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning(false);
    setIsFinished(false);
    setSecondsLeft(totalSeconds);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 p-2.5 px-4 rounded-2xl border transition-all select-none',
        isFinished
          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-200 animate-pulse'
          : isRunning
          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 shadow-sm'
          : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
      )}
    >
      <div className="flex items-center gap-2">
        <Bell className={cn('w-4 h-4', isRunning && 'animate-bounce text-amber-600', isFinished && 'text-emerald-600')} />
        {label && <span className="text-xs font-semibold opacity-80">{label}:</span>}
        <span className={cn('font-mono font-bold tracking-wider', size === 'lg' ? 'text-2xl' : 'text-sm')}>
          {formattedTime}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-1">
        <button
          type="button"
          onClick={toggle}
          className={cn(
            'p-1.5 rounded-xl font-medium transition-transform active:scale-90',
            isRunning
              ? 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100'
              : 'bg-brand-600 text-white hover:bg-brand-700'
          )}
          aria-label={isRunning ? t('common.timerPause') : t('common.timerStart')}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        <button
          type="button"
          onClick={reset}
          className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label={t('common.timerReset')}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
