import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Clock, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Laptop, 
  Plus, 
  X, 
  Download, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  Lock,
  Copy,
  Check,
  Ban,
  MessageSquareOff,
  AlertTriangle
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useShoppingList } from '../context/ShoppingListContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../types';
import { Button } from '../components/common/Button';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

export const ProfilePage: React.FC = () => {
  const { 
    favorites, 
    recentlyViewed, 
    collections, 
    userStaples, 
    addStaple, 
    removeStaple 
  } = useFavorites();
  const { totalCount, uncompletedCount } = useShoppingList();
  const { theme, setTheme } = useTheme();
  const { success, error, info } = useToast();
  const { t, localizeRecipe } = useLanguage();
  const { user, signOut, openAuthModal, friendlyId, isBanned, isMuted, userProfile, refreshUserProfile } = useAuth();

  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [newStapleInput, setNewStapleInput] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    refreshUserProfile();
  }, []);

  useEffect(() => {
    updateMetaTags({
      title: `${t('profile.title')} | ${t('common.siteName')}`,
      description: t('profile.subtitle')
    });

    if (recentlyViewed.length > 0) {
      Promise.all(recentlyViewed.slice(0, 4).map(id => recipeService.getById(id))).then(list => {
        setRecentRecipes(list.filter((r): r is Recipe => r !== null));
      });
    }
  }, [recentlyViewed, t]);

  const handleAddStaple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStapleInput.trim()) return;
    addStaple(newStapleInput.trim());
    setNewStapleInput('');
    success(t('common.save'), t('profile.stapleAdded'));
  };

  const handleSignOut = async () => {
    const { error: err } = await signOut();
    if (!err) {
      info('Вихід з акаунту', 'Ви успішно вийшли з кулінарного профілю');
    }
  };

  const handleExportData = async () => {
    try {
      const data = {
        user: user?.email,
        favorites: localStorage.getItem('smakolyk_favorites'),
        collections: localStorage.getItem('smakolyk_collections'),
        shoppingList: localStorage.getItem('smakolyk_shopping_list'),
        staples: localStorage.getItem('smakolyk_staples'),
        customRecipes: localStorage.getItem('smakolyk_recipes_custom'),
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `culinorium-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      success(t('profile.downloadBackup'), t('profile.backupExported'));
    } catch {
      error(t('common.error'), t('profile.backupError'));
    }
  };

  // If user is a guest (not authenticated), show the gate screen
  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-lg">
          <Lock className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Кулінарний профіль
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Особистий кабінет доступний лише для зареєстрованих кулінарів.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-card text-left space-y-4">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            Що дає реєстрація у Кулінаріумі?
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Захист улюблених рецептів:</strong> ваші збережені страви не зникнуть при очищенні кешу чи зміні браузера.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Синхронізація:</strong> переглядайте обране та списки покупок на телефоні, планшеті та компʼютері.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Базові інгредієнти:</strong> налаштовуйте власний холодильник для миттєвого підбору страв.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="primary"
            onClick={() => openAuthModal('login')}
            className="h-12 px-6 rounded-2xl font-bold shadow-md shadow-brand-500/20"
          >
            Увійти в акаунт
          </Button>
          <Button
            variant="outline"
            onClick={() => openAuthModal('register')}
            className="h-12 px-6 rounded-2xl font-bold"
          >
            Створити профіль
          </Button>
        </div>

        <div>
          <Link
            to="/recipes"
            className="text-xs font-semibold text-stone-500 hover:text-brand-600 transition-colors"
          >
            ← Повернутися до перегляду рецептів
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyId = () => {
    const toCopy = friendlyId || user?.id || '';
    if (!toCopy) return;
    navigator.clipboard.writeText(toCopy);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Кулінар';
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-in pt-4">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-r from-brand-600 via-amber-600 to-orange-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-3xl font-extrabold shrink-0 shadow-lg">
            {displayName[0].toUpperCase()}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold">{displayName}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/25 text-[11px] font-bold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Профіль
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              {user.email}
            </p>

            {/* Unique ID Badge and Status Badge */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md font-mono font-bold text-amber-100">
                <span>ID: {friendlyId || 'UID-00000000'}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="hover:text-white transition-colors ml-0.5"
                  title="Скопіювати унікальний ID"
                >
                  {copiedId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-80" />
                  )}
                </button>
              </div>

              {isBanned ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-[11px] shadow">
                  <Ban className="w-3.5 h-3.5" />
                  ЗАБЛОКОВАНО
                </span>
              ) : isMuted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500 text-white font-black text-[11px] shadow">
                  <MessageSquareOff className="w-3.5 h-3.5" />
                  КОМЕНТАРІ ОБМЕЖЕНО
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/80 text-white font-bold text-[11px] backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Акаунт активний
                </span>
              )}
            </div>

            {memberSince && (
              <p className="text-[11px] text-amber-200/80 pt-0.5">
                Учасник клубу з {memberSince}
              </p>
            )}

            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                ❤️ {favorites.length} {t('profile.savedRecipes')}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                📁 {collections.length} {t('favorites.collections')}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                🛒 {uncompletedCount} {t('profile.activeShoppingList')}
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="self-center sm:self-start flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition-all shrink-0 active:scale-95 shadow-sm"
          title="Вийти з акаунту"
        >
          <LogOut className="w-4 h-4" />
          <span>Вийти</span>
        </button>
      </div>

      {/* Moderation Warning Banners */}
      {isBanned && (
        <div className="p-5 sm:p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500/80 text-rose-900 dark:text-rose-200 space-y-3 animate-fade-in shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-rose-700 dark:text-rose-300">
                Ваш акаунт заблоковано адміністратором
              </h3>
              <p className="text-xs text-rose-600 dark:text-rose-400">
                Дію вашого профілю тимчасово призупинено через порушення правил платформи.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-100/70 dark:bg-rose-900/40 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Причина блокування:</span>
            </div>
            <div className="pl-5 text-rose-900 dark:text-rose-100">
              {userProfile?.banReason || 'Порушення правил спільноти Кулінаріум'}
            </div>
          </div>

          <p className="text-[11px] text-rose-600 dark:text-rose-400 leading-relaxed">
            * На час дії блокування ви не можете публікувати нові відгуки до рецептів. Якщо ви вважаєте це помилкою, зверніться до служби підтримки.
          </p>
        </div>
      )}

      {isMuted && !isBanned && (
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-500/80 text-amber-900 dark:text-amber-200 space-y-3 animate-fade-in shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <MessageSquareOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-amber-800 dark:text-amber-300">
                Встановлено обмеження на публікацію коментарів
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Можливість залишати відгуки до рецептів тимчасово відключено адміністратором.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-100/70 dark:bg-amber-900/40 text-xs space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-2 font-bold text-amber-800 dark:text-amber-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Термін дії обмеження:</span>
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-amber-200 dark:bg-amber-800 font-extrabold text-amber-900 dark:text-amber-100">
                {userProfile?.mutedUntil === 'permanent'
                  ? 'Безстроково'
                  : userProfile?.mutedUntil
                  ? new Date(userProfile.mutedUntil).toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Тимчасово'}
              </span>
            </div>
            {userProfile?.muteReason && (
              <div className="text-amber-900 dark:text-amber-100 pl-5 pt-0.5">
                <strong>Причина:</strong> {userProfile.muteReason}
              </div>
            )}
          </div>

          <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
            * Після закінчення терміну обмеження можливість писати відгуки відновиться автоматично.
          </p>
        </div>
      )}

      {/* QUICK LINKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/favorites"
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-warm hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{t('favorites.title')}</h3>
            <p className="text-xs text-stone-500">{favorites.length} {t('profile.savedRecipes')}</p>
          </div>
        </Link>

        <Link
          to="/shopping-list"
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-warm hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{t('shoppingList.title')}</h3>
            <p className="text-xs text-stone-500">{totalCount} {t('shoppingList.itemsTotal')}</p>
          </div>
        </Link>
      </div>

      {/* LANGUAGE SETTINGS */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            {t('profile.languageTitle')}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Choose your preferred language for recipes, articles, and application interface.
          </p>
        </div>
        <LanguageSelector variant="inline" />
      </div>

      {/* THEME SETTINGS */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 shadow-card space-y-4">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
          {t('profile.themeTitle')}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Laptop }
          ].map(opt => {
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id as typeof theme)}
                className={`p-3.5 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                <opt.icon className="w-5 h-5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PANTRY STAPLES SETTINGS */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            {t('profile.myStaplesTitle')}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {t('profile.myStaplesDesc')}
          </p>
        </div>

        {/* Existing staples chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {userStaples.map((staple, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200"
            >
              <span>{staple}</span>
              <button
                onClick={() => removeStaple(staple)}
                className="w-4 h-4 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500"
                aria-label={`Remove ${staple}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add staple form */}
        <form onSubmit={handleAddStaple} className="flex gap-2 max-w-sm pt-2">
          <input
            type="text"
            value={newStapleInput}
            onChange={(e) => setNewStapleInput(e.target.value)}
            placeholder={t('profile.addStaplePlaceholder')}
            className="flex-1 h-10 px-3 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl outline-none focus:border-brand-500"
          />
          <Button type="submit" size="sm" className="rounded-xl">
            <Plus className="w-4 h-4 mr-1" />
            {t('common.save')}
          </Button>
        </form>
      </div>

      {/* RECENTLY VIEWED RECIPES */}
      {recentRecipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            {t('profile.recentViewed')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentRecipes.map(r => (
              <RecipeCard key={r.id} recipe={localizeRecipe(r)} />
            ))}
          </div>
        </div>
      )}

      {/* BACKUP & DATA MANAGEMENT */}
      <div className="p-6 rounded-3xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-stone-800 dark:text-stone-200">
            {t('profile.exportBackup')}
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            {t('profile.exportDesc')}
          </p>
        </div>
        <Button
          onClick={handleExportData}
          variant="outline"
          size="sm"
          className="shrink-0"
        >
          <Download className="w-4 h-4 mr-2" />
          {t('profile.downloadBackup')}
        </Button>
      </div>
    </div>
  );
};
