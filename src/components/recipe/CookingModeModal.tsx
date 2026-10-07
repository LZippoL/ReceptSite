import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../../types';
import { CookingTimer } from './CookingTimer';
import { Button } from '../common/Button';

interface CookingModeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  isOpen,
  onClose
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Wake Lock API if supported to keep screen alive during cooking!
      if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').catch(() => {});
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = recipe.instructions;
  const currentStep = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!completedSteps.includes(currentStepIndex)) {
      setCompletedSteps(prev => [...prev, currentStepIndex]);
    }
    if (!isLast) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Finished all steps! Celebrate!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900 text-stone-100 flex flex-col justify-between p-4 sm:p-8 animate-fade-in select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-brand-400 font-bold block">
              Режим шеф-кухаря
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
              {recipe.title}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          aria-label="Вийти з режиму приготування"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden my-4">
        <div
          className="bg-brand-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Main Step Card: extra large text for wet/busy hands */}
      <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col justify-center py-6">
        <div className="bg-stone-800/80 border border-stone-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base font-bold px-3 py-1 rounded-xl bg-brand-500 text-white">
              Крок {currentStep.stepNumber} з {steps.length}
            </span>

            {/* Timer if available */}
            {currentStep.timerMinutes && (
              <CookingTimer
                initialMinutes={currentStep.timerMinutes}
                size="lg"
                label="Таймер кроку"
              />
            )}
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
            {currentStep.title}
          </h3>

          <p className="text-lg sm:text-2xl text-stone-200 leading-relaxed font-medium">
            {currentStep.instruction}
          </p>

          {/* Tip if available */}
          {currentStep.tip && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-amber-200 leading-snug">
                <strong className="text-amber-300">Підказка: </strong>
                {currentStep.tip}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls: large touch targets for thumbs */}
      <div className="max-w-3xl mx-auto w-full pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
        <Button
          onClick={handlePrev}
          disabled={isFirst}
          variant="secondary"
          size="lg"
          className="min-h-[56px] text-base px-6 rounded-2xl bg-stone-800 text-stone-200 hover:bg-stone-700"
        >
          <ChevronLeft className="w-6 h-6 mr-1" />
          Назад
        </Button>

        <span className="text-sm text-stone-400 font-medium">
          {currentStepIndex + 1} / {steps.length}
        </span>

        <Button
          onClick={handleNext}
          size="lg"
          className="min-h-[56px] text-base px-8 rounded-2xl bg-brand-600 hover:bg-brand-500 font-bold shadow-lg shadow-brand-500/30"
        >
          {isLast ? (
            <>
              <CheckCircle2 className="w-6 h-6 mr-2" />
              Готово!
            </>
          ) : (
            <>
              Далі
              <ChevronRight className="w-6 h-6 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
