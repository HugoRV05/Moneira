export type Category = 'comida' | 'ocio' | 'ropa' | 'salud' | 'deporte' | 'hogar';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  note: string;
  date: string; // ISO string
}

export interface CategoryInfo {
  label: string;
  color: string;
  icon: string;
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  comida: { label: 'Comida', color: 'var(--category-food)', icon: 'Utensils' },
  ocio: { label: 'Ocio', color: 'var(--category-leisure)', icon: 'PartyPopper' },
  ropa: { label: 'Ropa', color: 'var(--category-clothing)', icon: 'Shirt' },
  salud: { label: 'Salud', color: 'var(--category-health)', icon: 'Stethoscope' },
  deporte: { label: 'Deporte', color: 'var(--category-sport)', icon: 'Dumbbell' },
  hogar: { label: 'Hogar', color: 'var(--category-home)', icon: 'Home' },
};
