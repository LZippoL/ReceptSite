import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  CheckCircle2
} from 'lucide-react';
import { useShoppingList } from '../context/ShoppingListContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/common/Button';
import { updateMetaTags } from '../utils/seo';

export const ShoppingListPage: React.FC = () => {
  const { 
    items, 
    addItem, 
    toggleItem, 
    removeItem, 
    clearCompleted, 
    clearAll,
    uncompletedCount 
  } = useShoppingList();

  const { success } = useToast();
  const { t, language } = useLanguage();
  const [customName, setCustomName] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  React.useEffect(() => {
    updateMetaTags({
      title: `${t('shoppingList.title')} — ${t('common.siteName')}`,
      description: t('shoppingList.subtitle')
    });
  }, [language, t]);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    addItem({
      name: customName.trim(),
      amount: customAmount.trim() || undefined
    });
    setCustomName('');
    setCustomAmount('');
  };

  const handleCopyList = () => {
    if (items.length === 0) return;
    const text = items
      .map(i => `${i.completed ? '✓ ' : '☐ '} ${i.name} ${i.amount ? `(${i.amount})` : ''}`)
      .join('\n');
    navigator.clipboard.writeText(`🛒 ${t('shoppingList.title')} (${t('common.siteName')}):\n\n${text}`);
    success(t('common.copied'), t('shoppingList.title'));
  };

  const completedItems = items.filter(i => i.completed);
  const pendingItems = items.filter(i => !i.completed);

  const amountPlaceholder = language === 'zh' ? '1千克 / 2个' : language === 'de' ? '1 kg / 2 Stk' : language === 'en' ? '1 kg / 2 pcs' : '1 кг / 2 шт';
  const toBuyLabel = language === 'zh' ? '待购清单' : language === 'de' ? 'Zu kaufen' : language === 'en' ? 'To Buy' : 'Купити';
  const boughtLabel = language === 'zh' ? '已购买' : language === 'de' ? 'Bereits gekauft' : language === 'en' ? 'Purchased' : 'Вже куплено';
  const fromRecipeLabel = language === 'zh' ? '来自食谱' : language === 'de' ? 'aus Rezept' : language === 'en' ? 'from recipe' : 'з рецепта';

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16 animate-fade-in pt-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-brand-600" />
            {t('shoppingList.title')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t('shoppingList.itemsRemaining')}{' '}
            <strong className="text-brand-600">{uncompletedCount}</strong> / {items.length}
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopyList}
              variant="outline"
              size="sm"
              title={t('shareModal.copyLink')}
            >
              <Copy className="w-4 h-4 mr-1.5" />
              {t('common.share')}
            </Button>
            {completedItems.length > 0 && (
              <Button
                onClick={clearCompleted}
                variant="ghost"
                size="sm"
                className="text-stone-500 hover:text-rose-500"
              >
                {t('shoppingList.clearChecked')}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add Custom Product Form */}
      <form onSubmit={handleAddCustom} className="p-3 sm:p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder={t('shoppingList.addItemPlaceholder')}
            className="w-full h-10 px-3 text-sm bg-transparent outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
            required
          />
        </div>
        <div className="w-24 sm:w-28">
          <input
            type="text"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder={amountPlaceholder}
            className="w-full h-10 px-2 text-xs sm:text-sm bg-stone-100 dark:bg-stone-800 rounded-xl outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 border border-stone-200 dark:border-stone-700"
          />
        </div>
        <Button type="submit" size="sm" className="rounded-xl shrink-0" title={t('shoppingList.addItemBtn')}>
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="space-y-6">
          {/* Pending items */}
          {pendingItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1">
                {toBuyLabel} ({pendingItems.length})
              </h3>
              <div className="space-y-1.5">
                {pendingItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3 cursor-pointer hover:border-brand-300 transition-all shadow-sm group select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded-lg border-2 border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 flex items-center justify-center group-hover:border-brand-500 transition-colors shrink-0">
                        {item.completed && <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </p>
                        {item.recipeTitle && (
                          <p className="text-[11px] text-stone-400 truncate">
                            {fromRecipeLabel}: {item.recipeTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.amount && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {item.amount}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 transition-colors"
                        aria-label={t('common.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed items */}
          {completedItems.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1">
                {boughtLabel} ({completedItems.length})
              </h3>
              <div className="space-y-1.5">
                {completedItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="p-3 sm:p-3.5 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between gap-3 cursor-pointer opacity-70 transition-all select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500 border-2 border-emerald-500 flex items-center justify-center text-white shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <p className="text-sm font-medium line-through text-stone-500 dark:text-stone-400 truncate">
                        {item.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.amount && (
                        <span className="text-xs line-through text-stone-400">
                          {item.amount}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                        aria-label={t('common.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clear all footer */}
          <div className="pt-4 text-center">
            <button
              onClick={clearAll}
              className="text-xs text-rose-500 hover:underline"
            >
              {t('shoppingList.clearAll')}
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
            {t('shoppingList.emptyTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            {t('shoppingList.emptyDesc')}
          </p>
          <Link to="/recipes">
            <Button variant="primary">{t('shoppingList.browseRecipes')}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
