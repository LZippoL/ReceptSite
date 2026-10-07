import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  ChefHat, 
  Volume2, 
  VolumeX, 
  Check, 
  UtensilsCrossed, 
  MessageSquare,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../../types';
import { CookingTimer } from './CookingTimer';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

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
  const [isFinished, setIsFinished] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const wakeLockRef = useRef<any>(null);
  const { t, language } = useLanguage();

  // Screen WakeLock management to keep display awake while hands are busy cooking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const requestWakeLock = async () => {
        if ('wakeLock' in navigator) {
          try {
            wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          } catch {
            // WakeLock request rejected or not supported
          }
        }
      };

      requestWakeLock();

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && !wakeLockRef.current) {
          requestWakeLock();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (wakeLockRef.current) {
          wakeLockRef.current.release().catch(() => {});
          wakeLockRef.current = null;
        }
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    } else {
      document.body.style.overflow = 'unset';
      setIsFinished(false);
      setCurrentStepIndex(0);
      setCompletedSteps([]);
      setShowIngredients(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen]);

  // Cancel speech synthesis on step change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentStepIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIngredients) {
        if (e.key === 'Escape') setShowIngredients(false);
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showIngredients, currentStepIndex, isFinished]);

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
      // Completed last step! Trigger finale
      setIsFinished(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 }
      });
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Text-To-Speech reader
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const voiceText = `${currentStep.title}. ${currentStep.instruction}. ${
      currentStep.tip ? `${t('recipeDetail.tip')}: ${currentStep.tip}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(voiceText);
    const langCode = language === 'uk' ? 'uk-UA' : language === 'de' ? 'de-DE' : language === 'zh' ? 'zh-CN' : 'en-US';
    utterance.lang = langCode;
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Touch swipe support for smartphone cooking
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 55) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -55) {
      // Swiped right -> prev
      handlePrev();
    }
    setTouchStartX(null);
  };

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const scrollToReviewsAndClose = () => {
    onClose();
    setTimeout(() => {
      const reviewElem = document.getElementById('reviews-section') || document.querySelector('section');
      if (reviewElem) {
        reviewElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-950 text-stone-100 flex flex-col justify-between p-3 sm:p-6 lg:p-8 animate-fade-in select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
            <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-400 font-bold">
                {t('cookingMode.title')}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t('cookingMode.screenAwake')}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {recipe.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Ingredients Drawer Button */}
          <button
            onClick={() => setShowIngredients(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition-colors border border-stone-700"
            title={t('cookingMode.ingredientsBtn')}
          >
            <UtensilsCrossed className="w-4 h-4 text-brand-400" />
            <span className="hidden xs:inline">{t('cookingMode.ingredientsBtn')}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-700 text-stone-300">
              {recipe.ingredients.length}
            </span>
          </button>

          {/* Voice reader button */}
          {'speechSynthesis' in window && (
            <button
              onClick={toggleSpeech}
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-colors ${
                isSpeaking
                  ? 'bg-amber-500 text-stone-950 font-bold animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white'
              }`}
              title={isSpeaking ? t('cookingMode.voiceStop') : t('cookingMode.voiceRead')}
              aria-label={isSpeaking ? t('cookingMode.voiceStop') : t('cookingMode.voiceRead')}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
            </button>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            aria-label={t('cookingMode.exit')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Steps Pill Navigator & Progress Bar */}
      <div className="py-2.5 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-400 font-semibold px-1">
          <span>{t('cookingMode.stepOf')} {currentStepIndex + 1} / {steps.length}</span>
          <span className="text-brand-400">{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
        </div>

        {/* Clickable step pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {steps.map((st, idx) => {
            const isCurr = idx === currentStepIndex;
            const isDone = completedSteps.includes(idx);
            return (
              <button
                key={st.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  isCurr
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/40 scale-105'
                    : isDone
                    ? 'bg-emerald-950/70 border border-emerald-600/60 text-emerald-300'
                    : 'bg-stone-800/80 hover:bg-stone-700 text-stone-400'
                }`}
                title={`${t('recipeDetail.step')} ${st.stepNumber}: ${st.title}`}
              >
                {isDone && !isCurr ? <Check className="w-3.5 h-3.5" /> : st.stepNumber}
              </button>
            );
          })}
        </div>

        {/* Smooth continuous progress bar */}
        <div className="w-full bg-stone-800/80 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-600 to-amber-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Content OR Celebration View */}
      <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col justify-center py-4 sm:py-6 overflow-y-auto">
        {!isFinished ? (
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-xl bg-brand-500 text-white shadow-sm">
                {t('recipeDetail.step')} {currentStep.stepNumber}
              </span>

              {/* Timer if available */}
              {currentStep.timerMinutes && (
                <CookingTimer
                  initialMinutes={currentStep.timerMinutes}
                  size="md"
                  label={t('recipeDetail.startTimer')}
                />
              )}
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
              {currentStep.title}
            </h3>

            <p className="text-base sm:text-xl lg:text-2xl text-stone-200 leading-relaxed font-normal">
              {currentStep.instruction}
            </p>

            {/* Chef Tip */}
            {currentStep.tip && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-200 leading-snug">
                  <strong className="text-amber-300 font-bold">{t('recipeDetail.tip')}: </strong>
                  {currentStep.tip}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* CELEBRATION FINISH SCREEN */
          <div className="bg-stone-900 border border-brand-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-scale-up">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-brand-500/30">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {t('cookingMode.wellDone')}
              </h3>
              <p className="text-sm sm:text-base text-stone-300 max-w-md mx-auto">
                {t('cookingMode.wellDoneDesc')}
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-800/80 border border-stone-700 max-w-sm mx-auto text-left">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{recipe.title}</p>
                <p className="text-xs text-stone-400">{recipe.totalTime} {t('common.min')} • ★ {recipe.rating}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                onClick={onClose}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200"
              >
                {t('cookingMode.backToRecipe')}
              </Button>
              <Button
                onClick={scrollToReviewsAndClose}
                size="lg"
                className="w-full sm:w-auto rounded-2xl bg-brand-600 hover:bg-brand-500 font-bold shadow-lg shadow-brand-500/30"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {t('reviews.writeReview')}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Step Controls */}
      {!isFinished && (
        <div className="max-w-3xl mx-auto w-full pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
          <Button
            onClick={handlePrev}
            disabled={isFirst}
            variant="secondary"
            size="lg"
            className="min-h-[50px] sm:min-h-[56px] text-sm sm:text-base px-4 sm:px-6 rounded-2xl bg-stone-800 text-stone-200 hover:bg-stone-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="hidden xs:inline">{t('cookingMode.prevStep')}</span>
          </Button>

          <span className="text-xs sm:text-sm text-stone-400 font-medium">
            {currentStepIndex + 1} / {steps.length}
          </span>

          <Button
            onClick={handleNext}
            size="lg"
            className="min-h-[50px] sm:min-h-[56px] text-sm sm:text-base px-5 sm:px-8 rounded-2xl bg-brand-600 hover:bg-brand-500 font-bold shadow-lg shadow-brand-500/30"
          >
            {isLast ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-1.5" />
                {t('cookingMode.finishCooking')}
              </>
            ) : (
              <>
                <span>{t('cookingMode.nextStep')}</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Quick Ingredients Bottom Sheet / Modal Drawer */}
      {showIngredients && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div 
            className="fixed inset-0"
            onClick={() => setShowIngredients(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-brand-400" />
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {t('cookingMode.ingredientsBtn')} ({recipe.ingredients.length})
                </h4>
              </div>
              <button
                onClick={() => setShowIngredients(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-3 space-y-2 flex-1">
              {recipe.ingredients.map(ing => {
                const isChecked = checkedIngredients.includes(ing.id);
                return (
                  <div
                    key={ing.id}
                    onClick={() => toggleIngredientCheck(ing.id)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                      isChecked
                        ? 'bg-stone-850 border-stone-800 text-stone-500 opacity-60'
                        : 'bg-stone-800/80 border-stone-700/80 text-stone-200 hover:border-brand-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-500'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium truncate ${isChecked ? 'line-through' : ''}`}>
                        {ing.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-stone-700 text-stone-300 shrink-0">
                      {ing.amount > 0 ? `${ing.amount} ` : ''}{ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => setShowIngredients(false)}
              className="w-full mt-2 rounded-2xl bg-brand-600 hover:bg-brand-500"
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
