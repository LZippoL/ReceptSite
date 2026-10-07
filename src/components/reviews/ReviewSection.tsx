import React, { useState, useEffect, useTransition } from 'react';
import { ThumbsUp, MessageSquarePlus, MessageSquare, Star } from 'lucide-react';
import { Review } from '../../types';
import { reviewService } from '../../services/reviewService';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';

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
      error('Помилка', 'Вкажіть ваше ім\'я');
      return;
    }
    if (!comment.trim()) {
      error('Помилка', 'Напишіть відгук');
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

      success('Відгук додано!', 'Дякуємо за вашу оцінку страви');
      setIsModalOpen(false);
      setComment('');
      setPhotoUrl('');
      loadReviews();
    } catch {
      error('Помилка', 'Не вдалося зберегти відгук');
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
    : '5.0';

  return (
    <section className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl p-5 sm:p-8 shadow-card">
      {/* Header with summary and add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            Відгуки та оцінки
            <span className="text-sm font-normal text-stone-500">
              ({reviews.length})
            </span>
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-lg">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{avgRating}</span>
            </div>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-xs sm:text-sm text-stone-500">
              {reviews.length} відгуків від кулінарів
            </span>
          </div>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="shadow-md shadow-brand-500/20"
        >
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          Залишити відгук
        </Button>
      </div>

      {/* Sorting bar */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between py-4 border-b border-stone-100 dark:border-stone-800/60 text-xs">
          <span className="text-stone-500 font-medium">Сортування:</span>
          <div className="flex gap-1">
            {[
              { id: 'newest', label: 'Нові' },
              { id: 'helpful', label: 'Найкорисніші' },
              { id: 'highest', label: 'Найвища оцінка' },
              { id: 'lowest', label: 'Найнижча оцінка' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id as typeof sortBy)}
                className={`px-2.5 py-1 rounded-xl transition-colors ${
                  sortBy === opt.id
                    ? 'bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reviews list */}
      <div className="pt-6 space-y-6">
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
                      {new Date(review.createdAt).toLocaleDateString('uk-UA', {
                        year: 'numeric',
                        month: 'long',
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
                    alt="Фото страви від автора відгуку"
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
                  <span>Корисно ({review.likes})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              Ще немає відгуків на цю страву
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Будьте першим, хто приготує і оцінить цей рецепт!
            </p>
          </div>
        )}
      </div>

      {/* Review submission modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ваш відгук"
        description={`Поділіться враженнями про страву "${recipeTitle}"`}
      >
        <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
          {/* Star selector */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-500 mb-2">
              Ваша оцінка:
            </span>
            <RatingStars
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
          </div>

          <Input
            label="Ваше ім'я"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Наприклад: Наталія"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Текст відгуку
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Як вам страва? Чи сподобалося поєднання інгредієнтів?"
              rows={4}
              required
              className="w-full p-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
            />
          </div>

          <Input
            label="Фото готової страви (URL, необов'язково)"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Скасувати
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="flex-1"
            >
              Опублікувати
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};
