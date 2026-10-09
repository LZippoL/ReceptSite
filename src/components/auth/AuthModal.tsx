import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Sparkles, ChefHat } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple
  } = useAuth();

  const { success } = useToast();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync mode with context
  React.useEffect(() => {
    setMode(authModalMode);
    setFormError(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password.trim()) {
      setFormError('Будь ласка, заповніть усі обовʼязкові поля');
      return;
    }

    if (password.length < 6) {
      setFormError('Пароль повинен містити щонайменше 6 символів');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email.trim(), password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setFormError('Невірний email або пароль');
          } else {
            setFormError(error.message);
          }
        } else {
          success('Успішний вхід', 'Раді вітати вас знову у Кулінаріумі!');
          closeAuthModal();
          setEmail('');
          setPassword('');
        }
      } else {
        const { error, user } = await signUpWithEmail(email.trim(), password, name.trim());
        if (error) {
          if (error.message.includes('User already registered')) {
            setFormError('Користувач з таким email вже зареєстрований. Спробуйте увійти.');
          } else {
            setFormError(error.message);
          }
        } else {
          if (user?.identities?.length === 0) {
            setFormError('Користувач вже існує. Будь ласка, увійдіть.');
          } else {
            success('Успішна реєстрація!', 'Ваш кулінарний профіль створено. Ласкаво просимо!');
            closeAuthModal();
            setEmail('');
            setPassword('');
            setName('');
          }
        }
      }
    } catch (err: any) {
      setFormError(err.message || 'Сталася непередбачена помилка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    setFormError(null);
    setIsLoading(true);
    try {
      const { error } = provider === 'google' ? await signInWithGoogle() : await signInWithApple();
      if (error) {
        const msg = (error as any).message || '';
        if (msg.includes('not enabled') || msg.includes('provider')) {
          setFormError(`Авторизація через ${provider === 'google' ? 'Google' : 'Apple'} ще налаштовується в Supabase. Ви можете зареєструватися за допомогою Email та паролю.`);
        } else {
          setFormError(msg || `Помилка входу через ${provider}`);
        }
      }
    } catch (err: any) {
      setFormError(err.message || 'Помилка авторизації');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/25">
            <ChefHat className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            {mode === 'login' ? 'Вхід у кулінарний профіль' : 'Реєстрація у Кулінаріумі'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            {mode === 'login'
              ? 'Увійдіть, щоб залишати відгуки, додавати фото та оцінювати відгуки інших кулінарів'
              : 'Створіть безкоштовний акаунт, щоб ділитися враженнями та фото приготованих страв'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => { setMode('login'); setFormError(null); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-stone-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Вхід
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setFormError(null); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-stone-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Реєстрація
          </button>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2.5">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 rounded-2xl text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200 transition-all shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Продовжити з Google</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('apple')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 rounded-2xl text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200 transition-all shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.56.64-1.05 1.7-0.92 2.73 1 .08 2-.48 2.62-1.23z" />
            </svg>
            <span>Продовжити з Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 dark:border-stone-800 w-full" />
          <span className="bg-white dark:bg-stone-900 px-3 text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-bold absolute">
            або через Email
          </span>
        </div>

        {/* Error notice */}
        {formError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <div className="flex-1">{formError}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Ваше кулінарне імʼя (необовʼязково)"
              placeholder="Шеф Олена"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-4 h-4" />}
            />
          )}

          <Input
            label="Email"
            type="email"
            placeholder="vasyl@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            placeholder="Мінімум 6 символів"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock className="w-4 h-4" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full h-12 rounded-2xl text-sm font-bold shadow-md shadow-brand-500/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Зачекайте...
              </span>
            ) : mode === 'login' ? (
              'Увійти в акаунт'
            ) : (
              'Зареєструватися безкоштовно'
            )}
          </Button>
        </form>

        <p lang="uk" className="text-xs leading-6 text-stone-600 dark:text-stone-300">
          Перед створенням облікового запису ознайомтеся з{' '}
          <a href={`${import.meta.env.BASE_URL}privacy/`} target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-300 underline underline-offset-2">політикою конфіденційності (нова вкладка)</a>
          {' '}та{' '}
          <a href={`${import.meta.env.BASE_URL}terms/`} target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-300 underline underline-offset-2">умовами користування (нова вкладка)</a>.
        </p>

        {/* Benefits reminder */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/40 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            {mode === 'login'
              ? 'Відгуки зберігаються на сервері. Улюблені рецепти та списки покупок зберігаються у цьому браузері.'
              : 'Для перегляду рецептів акаунт не потрібен. Улюблені рецепти та списки покупок зберігаються у цьому браузері.'}
          </span>
        </div>
      </div>
    </Modal>
  );
};
