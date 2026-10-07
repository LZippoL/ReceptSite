import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={`Тема: ${theme}. Натисніть щоб змінити`}
      title={`Тема: ${theme === 'light' ? 'Світла' : theme === 'dark' ? 'Темна' : 'Системна'}`}
      className="relative text-stone-600 dark:text-stone-300"
    >
      {theme === 'light' && <Sun className="w-5 h-5 text-amber-500 animate-scale-up" />}
      {theme === 'dark' && <Moon className="w-5 h-5 text-brand-400 animate-scale-up" />}
      {theme === 'system' && <Laptop className="w-5 h-5 text-stone-500 animate-scale-up" />}
    </Button>
  );
};
