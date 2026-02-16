import type { HTMLAttributes, ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export function Card({ 
  children, 
  className, 
  title,
  ...props 
}: CardProps) {
  return (
    <div 
      className={cn('neo-card', className)} 
      {...props}
    >
      {title && <h2 className="mb-4 text-xl font-black uppercase">{title}</h2>}
      {children}
    </div>
  );
}
