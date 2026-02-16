import { useState, type FormEvent } from 'react';
import type { Expense, Category } from '../types';
import { CATEGORIES } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ArrowLeft, Save } from 'lucide-react';

interface ExpenseFormProps {
  onSave: (expense: Expense) => void;
  onCancel: () => void;
}

export function ExpenseForm({ onSave, onCancel }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('comida');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onSave({
      id: crypto.randomUUID(),
      amount: Number(amount),
      category,
      note,
      date: new Date(date).toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-yellow-400 p-4 pt-12 overflow-y-auto">
      <div className="container max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={onCancel} className="p-3">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-3xl font-black uppercase">Moneira</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-12">
          <Card>
            <label className="block text-sm font-black uppercase mb-2">Monto (€)</label>
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full text-4xl p-4 neo-border focus:outline-none focus:bg-blue-50 font-black"
              autoFocus
              required
            />
          </Card>

          <Card title="Categoría">
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-4 neo-border font-bold flex flex-col items-center gap-2 transition-all ${
                    category === cat 
                      ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' 
                      : 'bg-white neo-shadow'
                  }`}
                >
                  <span className="text-sm uppercase font-black">{CATEGORIES[cat].label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Detalles">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black uppercase mb-1">Nota (Opcional)</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ej: Cena VIPS"
                  className="w-full p-3 neo-border focus:outline-none focus:bg-blue-50 font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase mb-1">Fecha</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 neo-border focus:outline-none font-bold"
                  required
                />
              </div>
            </div>
          </Card>

          <Button type="submit" variant="secondary" className="w-full text-2xl py-6 mt-4">
            <Save /> GUARDAR GASTO
          </Button>
        </form>
      </div>
    </div>
  );
}
