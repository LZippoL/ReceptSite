import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/reviews/initialReviews';
import { storage } from './storageService';
import { recipeService } from './recipeService';

const STORAGE_KEY = 'smakolyk_reviews_custom';

export interface IReviewService {
  getByRecipeId(recipeId: string): Promise<Review[]>;
  addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'likes'>): Promise<Review>;
  likeReview(reviewId: string): Promise<number>;
}

class ReviewService implements IReviewService {
  async getAll(): Promise<Review[]> {
    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    return [...custom, ...INITIAL_REVIEWS];
  }

  async getByRecipeId(recipeId: string): Promise<Review[]> {
    const all = await this.getAll();
    return all.filter(r => r.recipeId === recipeId);
  }

  async addReview(data: Omit<Review, 'id' | 'createdAt' | 'likes'>): Promise<Review> {
    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const newReview: Review = {
      ...data,
      id: `rev-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    custom.unshift(newReview);
    await storage.set(STORAGE_KEY, custom);

    // Recalculate recipe average rating and reviews count
    try {
      const allReviewsForRecipe = await this.getByRecipeId(data.recipeId);
      const totalScore = allReviewsForRecipe.reduce((acc, r) => acc + r.rating, 0);
      const newRating = Number((totalScore / allReviewsForRecipe.length).toFixed(1));
      await recipeService.update(data.recipeId, {
        rating: newRating,
        reviewsCount: allReviewsForRecipe.length
      });
    } catch (e) {
      console.warn('Could not update recipe rating after review:', e);
    }

    return newReview;
  }

  async likeReview(reviewId: string): Promise<number> {
    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const target = custom.find(r => r.id === reviewId);
    if (target) {
      target.likes += 1;
      await storage.set(STORAGE_KEY, custom);
      return target.likes;
    }
    const initial = INITIAL_REVIEWS.find(r => r.id === reviewId);
    if (initial) {
      initial.likes += 1;
      return initial.likes;
    }
    return 0;
  }
}

export const reviewService = new ReviewService();
