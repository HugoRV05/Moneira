import { useEffect } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  onUndo?: () => void;
  onClose: () => void;
  visible: boolean;
}

export function Toast({ message, onUndo, onClose, visible }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-4 right-4 z-[100]"
        >
          <div className="bg-black text-white p-4 neo-border flex items-center justify-between shadow-xl">
            <span className="font-bold uppercase text-sm">{message}</span>
            <div className="flex gap-2">
              {onUndo && (
                <button 
                  onClick={() => { onUndo(); onClose(); }}
                  className="flex items-center gap-1 text-xs font-black uppercase bg-blue-600 px-3 py-1 neo-border border-white"
                >
                  <RotateCcw size={14} /> Deshacer
                </button>
              )}
              <button onClick={onClose} className="p-1" aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
