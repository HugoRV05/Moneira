import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseStats } from './components/ExpenseStats';
import { Toast } from './components/Toast';
import { Button } from './components/ui/Button';
import type { Expense } from './types';

function App() {
  const { 
    expenses, 
    addExpense, 
    deleteExpense, 
    undoDelete, 
    clearLastDeleted 
  } = useExpenses();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = (expense: Expense) => {
    addExpense(expense);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setShowToast(true);
  };

  return (
    <div className="container min-h-screen">
      {/* Header */}
      <header className="py-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl text-black">Moneira</h1>
          <p className="text-sm font-black uppercase opacity-60">Control Erasmus 2026</p>
        </div>
        <div className="w-16 h-16 bg-white neo-border neo-shadow overflow-hidden flex items-center justify-center shrink-0">
          <img 
            src={`${import.meta.env.BASE_URL}icon.webp`} 
            alt="Moneira Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Stats Summary */}
      <ExpenseStats expenses={expenses} />

      {/* Recent Activity Label */}
      <h2 className="text-xl mb-4 uppercase font-black">Actividad Reciente</h2>

      {/* List */}
      <ExpenseList expenses={expenses} onDelete={handleDelete} />

      {/* Floating Action Button */}
      {!isFormOpen && (
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-8 right-4 w-16 h-16 rounded-none p-0 flex items-center justify-center neo-shadow-lg bg-black z-50"
        >
          <Plus size={32} />
        </Button>
      )}

      {/* Entry Form Modal-like */}
      {isFormOpen && (
        <ExpenseForm 
          onSave={handleSave} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      {/* Undo Toast */}
      <Toast 
        visible={showToast}
        message="Gasto eliminado"
        onUndo={undoDelete}
        onClose={() => {
          setShowToast(false);
          clearLastDeleted();
        }}
      />
    </div>
  );
}

export default App;
