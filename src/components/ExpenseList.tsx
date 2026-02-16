import type { Expense } from '../types';
import { CATEGORIES } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Trash2, 
  Utensils, 
  PartyPopper, 
  Shirt, 
  Stethoscope, 
  Dumbbell, 
  Home 
} from 'lucide-react';
import { Card } from './ui/Card';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl font-bold uppercase opacity-50">No hay gastos todavía</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {expenses.map((expense) => {
        const catInfo = CATEGORIES[expense.category];
        return (
          <div key={expense.id} className="relative group">
            <Card className="flex items-center gap-4 p-4">
              <div 
                className="w-12 h-12 flex items-center justify-center neo-border shrink-0"
                style={{ backgroundColor: catInfo.color }}
              >
                {expense.category === 'comida' && <Utensils size={24} />}
                {expense.category === 'ocio' && <PartyPopper size={24} />}
                {expense.category === 'ropa' && <Shirt size={24} />}
                {expense.category === 'salud' && <Stethoscope size={24} />}
                {expense.category === 'deporte' && <Dumbbell size={24} />}
                {expense.category === 'hogar' && <Home size={24} />}
              </div>
              
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="truncate text-lg leading-tight uppercase font-black">
                    {expense.note || catInfo.label}
                  </h3>
                  <span className="text-xl font-black shrink-0">
                    -{expense.amount.toFixed(2)}€
                  </span>
                </div>
                <p className="text-xs font-bold uppercase opacity-60">
                  {format(new Date(expense.date), "d 'de' MMMM", { locale: es })}
                </p>
              </div>

              <button 
                onClick={() => onDelete(expense.id)}
                className="p-2 hover:text-red-600 transition-colors"
                aria-label="Eliminar gasto"
              >
                <Trash2 size={20} />
              </button>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
