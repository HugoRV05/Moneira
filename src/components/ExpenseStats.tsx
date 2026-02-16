import type { Expense } from '../types';
import { startOfMonth, isWithinInterval, endOfMonth } from 'date-fns';
import { Card } from './ui/Card';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const now = new Date();
  
  const weeklyTotal = expenses
    .filter(e => isWithinInterval(new Date(e.date), {
      start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      end: now
    }))
    .reduce((sum, e) => sum + e.amount, 0);

  const monthlyTotal = expenses
    .filter(e => isWithinInterval(new Date(e.date), {
      start: startOfMonth(now),
      end: endOfMonth(now)
    }))
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Card className="bg-white">
        <p className="text-xs font-black uppercase opacity-60 mb-1">Esta Semana</p>
        <p className="text-2xl font-black">{weeklyTotal.toFixed(2)}€</p>
      </Card>
      <Card className="bg-blue text-white">
        <p className="text-xs font-black uppercase opacity-80 mb-1">Este Mes</p>
        <p className="text-2xl font-black">{monthlyTotal.toFixed(2)}€</p>
      </Card>
    </div>
  );
}
