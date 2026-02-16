import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  title,
  ...props 
}) => {
  return (
    <div 
      className={cn('neo-card', className)} 
      {...props}
    >
      {title && <h2 className="mb-4 text-xl">{title}</h2>}
      {children}
    </div>
  );
};
