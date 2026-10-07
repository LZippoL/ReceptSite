import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'secondary',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-800',
    secondary: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700',
    outline: 'bg-transparent text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-700',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  };

  const sizes = {
    sm: 'text-[11px] font-medium px-2 py-0.5 rounded-lg border',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-xl border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 leading-none select-none transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
