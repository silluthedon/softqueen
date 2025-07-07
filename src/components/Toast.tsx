import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose, darkMode }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${
        darkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
      }`}>
        <CheckCircle className="text-green-500" size={20} />
        <span className={`font-medium ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {message}
        </span>
        <button
          onClick={onClose}
          className={`p-1 rounded-full transition-colors duration-200 ${
            darkMode
              ? 'hover:bg-gray-700 text-gray-400'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;