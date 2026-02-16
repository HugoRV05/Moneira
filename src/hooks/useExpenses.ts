import { useState, useEffect, useCallback } from 'react';
import type { Expense } from '../types';
import { INITIAL_EXPENSES } from '../data/seedData';

const STORAGE_KEY = 'contas_expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [lastDeleted, setLastDeleted] = useState<Expense | null>(null);

  // Load from localStorage or seed
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load expenses', e);
        setExpenses(INITIAL_EXPENSES);
      }
    } else {
      // First run: use seed data
      setExpenses(INITIAL_EXPENSES);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses]);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const expenseToDelete = prev.find((e) => e.id === id);
      if (expenseToDelete) {
        setLastDeleted(expenseToDelete);
      }
      return prev.filter((e) => e.id !== id);
    });
  }, []);

  const undoDelete = useCallback(() => {
    if (lastDeleted) {
      setExpenses((prev) => [lastDeleted, ...prev].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
      setLastDeleted(null);
    }
  }, [lastDeleted]);

  const clearLastDeleted = useCallback(() => {
    setLastDeleted(null);
  }, []);

  return {
    expenses,
    addExpense,
    deleteExpense,
    undoDelete,
    lastDeleted,
    clearLastDeleted,
  };
}
