import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/common/Button';
import { updateMetaTags } from '../utils/seo';

export const NotFoundPage: React.FC = () => {
  React.useEffect(() => {
    updateMetaTags({
      title: '404 — Сторінку не знайдено',
      description: 'Сторінку, яку ви шукаєте, не знайдено.'
    });
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 animate-fade-in">
      <div className="w-24 h-24 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shadow-inner">
        <ChefHat className="w-12 h-12" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-4xl sm:text-6xl font-black text-brand-600 dark:text-brand-400 block font-mono">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          Упс! Цю страву ще не приготували
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Сторінка, яку ви шукаєте, не існує або була переміщена. Спробуйте скористатися пошуком або поверніться на головну.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link to="/">
          <Button size="lg" className="rounded-2xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На головну сторінку
          </Button>
        </Link>
        <Link to="/what-to-cook">
          <Button variant="outline" size="lg" className="rounded-2xl">
            <Search className="w-4 h-4 mr-2" />
            Що у холодильнику?
          </Button>
        </Link>
      </div>
    </div>
  );
};
