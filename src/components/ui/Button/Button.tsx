import React from 'react';
import { cn } from '../../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
   size?: "sm" | "md" | "lg" | "icon";
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90',
    secondary: 'bg-primary/10 text-primary hover:bg-primary/20',
    outline: 'border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500',
    white: 'bg-white text-primary shadow-xl hover:bg-slate-50'
  };

  return (
    <button 
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        'px-6 py-3 text-sm',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
