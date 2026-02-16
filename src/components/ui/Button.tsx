import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-white',
    secondary: 'bg-[var(--color-blue)] text-white',
    danger: 'bg-red-500 text-white',
  };

  return (
    <button 
      className={cn('neo-btn', variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
}
