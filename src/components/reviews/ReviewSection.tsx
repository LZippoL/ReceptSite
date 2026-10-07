import React, { useState, useEffect, useTransition } from 'react';
import { ThumbsUp, MessageSquarePlus, MessageSquare, Star } from 'lucide-react';
import { Review } from '../../types';
import { reviewService } from '../../services/reviewService';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { ImageUpload } from '../common/ImageUpload';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

interface ReviewSectionProps {
  recipeId: string;
  recipeTitle: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  recipeId,
  recipeTitle
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [, startTransition] = useTransition();
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'highest' | 'lowest'>('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { success, error } = useToast();
  const { t, language } = useLanguage();

  const loadReviews = () => {
    reviewService.getByRecipeId(recipeId).then(data => {
      startTransition(() => setReviews(data));
    });
  };

  useEffect(() => {
    loadReviews();
  }, [recipeId]);

  const handleLike = async (reviewId: string) => {
    await reviewService.likeReview(reviewId);
    loadReviews();
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      error(t('common.error'), t('reviews.yourName'));
      return;
    }
    if (!comment.trim()) {
      error(t('common.error'), t('reviews.comment'));
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewService.addReview({
        recipeId,
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
        photoUrl: photoUrl.trim() || undefined
      });

      success(t('reviews.successToast'), recipeTitle);
      setIsModalOpen(false);
      setComment('');
      setPhotoUrl('');
      loadReviews();
    } catch {
      error(t('common.error'), 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'helpful') return b.likes - a.likes;
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <section id="reviews-section" className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl p-5 sm:p-8 shadow-card scroll-mt-24">
      {/* Header with summary and add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            {t('reviews.title')}
            <span className="text-sm font-normal text-stone-500">
              ({reviews.length})
            </span>
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1.5 font-extrabold text-lg text-stone-400 dark:text-stone-500">
              <Star className={cn('w-5 h-5', reviews.length > 0 ? 'fill-amber-400 text-amber-400' : 'text-stone-300 dark:text-stone-600')} />
              <span className={reviews.length > 0 ? 'text-amber-500' : 'text-stone-500 dark:text-stone-400'}>{avgRating}</span>
            </div>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-xs sm:text-sm text-stone-500">
              {reviews.length} {t('reviews.count')}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="shadow-md shadow-brand-500/20"
        >
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          {t('reviews.writeReview')}
        </Button>
      </div>

      {/* Reviews list */}
      <div className="pt-6 space-y-6">
        {reviews.length > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400 font-semibold">{t('recipes.sortBy')}</span>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                sortBy === 'newest'
                  ? 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {t('recipes.sortNewest')}
            </button>
            <button
              onClick={() => setSortBy('highest')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                sortBy === 'highest'
                  ? 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {t('recipes.sortRating')}
            </button>
          </div>
        )}

        {sortedReviews.length > 0 ? (
          sortedReviews.map(review => (
            <div
              key={review.id}
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-amber-500 text-white font-bold text-sm flex items-center justify-center">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {review.userName}
                    </h5>
                    <span className="text-[11px] text-stone-600 dark:text-stone-300">
                      {new Date(review.createdAt).toLocaleDateString(language === 'uk' ? 'uk-UA' : language === 'de' ? 'de-DE' : language === 'zh' ? 'zh-CN' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <RatingStars rating={review.rating} size="sm" />
              </div>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {review.comment}
              </p>

              {review.photoUrl && (
                <div className="mt-1">
                  <img
                    src={review.photoUrl}
                    alt={review.userName}
                    className="w-24 h-24 object-cover rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm"
                  />
                </div>
              )}

              <div className="flex items-center justify-end pt-2 border-t border-stone-200/40 dark:border-stone-700/40">
                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>({review.likes})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {t('reviews.noReviewsYet')}
            </p>
          </div>
        )}
      </div>

      {/* Review submission modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('reviews.writeReview')}
        description={`"${recipeTitle}"`}
      >
        <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
          {/* Star selector */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-500 mb-2">
              {t('reviews.yourRating')}
            </span>
            <RatingStars
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
          </div>

          <Input
            label={t('reviews.yourName')}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={t('reviews.yourNamePlaceholder')}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              {t('reviews.comment')}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('reviews.commentPlaceholder')}
              rows={4}
              required
              className="w-full p-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
            />
          </div>

          <ImageUpload
            label="Фото страви (необов'язково)"
            value={photoUrl}
            onChange={setPhotoUrl}
            folder="reviews"
          />

          <div className="pt-2 sticky bottom-0 bg-white dark:bg-stone-900 pb-1">
            <div className="flex gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-2xl"
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="flex-1 rounded-2xl bg-brand-600 hover:bg-brand-500 font-bold shadow-md shadow-brand-500/30"
              >
                {t('reviews.submit')}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
};
