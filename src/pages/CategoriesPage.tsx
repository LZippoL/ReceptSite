import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../types';
import { updateMetaTags } from '../utils/seo';

export const CategoriesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    updateMetaTags({
      title: 'Усі категорії рецептів — Смаколик',
      description: 'Обирайте страви з 14 популярних категорій: сніданки, обіди, супи, салати, випічка, десерти та вегетаріанські страви.'
    });
    recipeService.getAll().then(setRecipes);
  }, []);

  return (
    <div className="space-y-8 pb-14 animate-fade-in pt-4">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100">
          Категорії рецептів
        </h1>
        <p className="text-sm text-stone-500 mt-2">
          Знаходьте страви за категоріями, часом приготування та типом харчування.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map(category => {
          const count = recipes.filter(r => r.category === category.id).length;

          return (
            <Link
              key={category.id}
              to={`/recipes?category=${category.id}`}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-card hover:shadow-warm hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 text-2xl p-2 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-md">
                  {category.icon}
                </div>
                <div className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 rounded-xl bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 backdrop-blur-md shadow-sm">
                  {count} рецептів
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
