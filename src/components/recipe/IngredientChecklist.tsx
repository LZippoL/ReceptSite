import React, { useState } from 'react';
import { ShoppingCart, Check, CheckSquare, Square } from 'lucide-react';
import { Recipe } from '../../types';
import { ServingsCalculator } from './ServingsCalculator';
import { useShoppingList } from '../../context/ShoppingListContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { cn } from '../../utils/cn';

interface IngredientChecklistProps {
  recipe: Recipe;
}

export const IngredientChecklist: React.FC<IngredientChecklistProps> = ({ recipe }) => {
  const [servings, setServings] = useState<number>(recipe.servings);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedForCart, setSelectedForCart] = useState<string[]>(() =>
    recipe.ingredients.filter(i => !i.isStaple).map(i => i.id)
  );

  const { addMultipleItems } = useShoppingList();
  const { success } = useToast();
  const { t } = useLanguage();

  const scalingRatio = servings / recipe.servings;

  const toggleChecked = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const formatScaledAmount = (amount: number): string => {
    if (!amount) return '';
    const scaled = amount * scalingRatio;
    if (Number.isInteger(scaled)) return scaled.toString();
    const rounded = Math.round(scaled * 10) / 10;
    return rounded.toString();
  };

  const handleOpenAddModal = () => {
    const initialSelected = recipe.ingredients
      .filter(i => !checkedIds.includes(i.id) && !i.isStaple)
      .map(i => i.id);
    setSelectedForCart(initialSelected.length > 0 ? initialSelected : recipe.ingredients.map(i => i.id));
    setIsAddModalOpen(true);
  };

  const toggleCartSelection = (id: string) => {
    setSelectedForCart(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleConfirmAddToCart = () => {
    const itemsToAdd = recipe.ingredients
      .filter(ing => selectedForCart.includes(ing.id))
      .map(ing => ({
        name: ing.name,
        amount: ing.amount > 0 ? `${formatScaledAmount(ing.amount)} ${ing.unit}` : ing.unit,
        recipeTitle: recipe.title,
        recipeId: recipe.id
      }));

    if (itemsToAdd.length > 0) {
      addMultipleItems(itemsToAdd);
      success(t('recipeDetail.addedToShoppingList'), `${itemsToAdd.length}`);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl p-5 sm:p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            {t('recipeDetail.ingredientsTitle')}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {recipe.ingredients.length}
            </span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {t('common.servingsCount')}: {servings}
          </p>
        </div>

        {/* Servings calculator */}
        <div className="w-full sm:w-auto">
          <ServingsCalculator
            servings={servings}
            baseServings={recipe.servings}
            onChange={setServings}
          />
        </div>
      </div>

      {/* Checklist items */}
      <ul className="space-y-2.5 mb-6 divide-y divide-stone-100 dark:divide-stone-800/50">
        {recipe.ingredients.map(ing => {
          const isChecked = checkedIds.includes(ing.id);
          const scaledAmount = formatScaledAmount(ing.amount);

          return (
            <li
              key={ing.id}
              onClick={() => toggleChecked(ing.id)}
              className={cn(
                'pt-2.5 first:pt-0 flex items-start justify-between gap-3 p-2 rounded-2xl cursor-pointer select-none transition-all group',
                isChecked
                  ? 'bg-stone-100/70 dark:bg-stone-800/40 text-stone-400 dark:text-stone-500'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-5 h-5 mt-0.5 rounded-lg border flex items-center justify-center transition-all',
                    isChecked
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 group-hover:border-brand-500'
                  )}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <span className={cn('text-sm font-medium transition-all', isChecked && 'line-through')}>
                    {ing.name}
                  </span>
                  {ing.notes && (
                    <span className="block text-xs text-stone-400 dark:text-stone-500">
                      ({ing.notes})
                    </span>
                  )}
                </div>
              </div>

              {scaledAmount && (
                <span className={cn('text-sm font-bold shrink-0 text-stone-900 dark:text-stone-100', isChecked && 'line-through opacity-60')}>
                  {scaledAmount} {ing.unit}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Add to shopping list button */}
      <Button
        onClick={handleOpenAddModal}
        variant="outline"
        className="w-full border-brand-300 dark:border-brand-800 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/50"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {t('recipeDetail.addToShoppingList')}
      </Button>

      {/* Selection Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('shoppingList.title')}
        description={t('recipeDetail.addToShoppingList')}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="font-semibold text-stone-500">
              {selectedForCart.length} / {recipe.ingredients.length}
            </span>
            <button
              onClick={() => setSelectedForCart(recipe.ingredients.map(i => i.id))}
              className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              {t('recipeDetail.checkAll')}
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {recipe.ingredients.map(ing => {
              const selected = selectedForCart.includes(ing.id);
              return (
                <div
                  key={ing.id}
                  onClick={() => toggleCartSelection(ing.id)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {selected ? (
                      <CheckSquare className="w-4 h-4 text-brand-600" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400" />
                    )}
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {ing.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-stone-500">
                    {formatScaledAmount(ing.amount)} {ing.unit}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleConfirmAddToCart}
              disabled={selectedForCart.length === 0}
              className="flex-1"
            >
              {t('common.save')} ({selectedForCart.length})
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
