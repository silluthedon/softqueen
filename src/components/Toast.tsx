import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  darkMode: boolean;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  duration?: number;
  language?: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  show,
  onClose,
  darkMode,
  type = 'success',
  position = 'bottom-right',
  duration = 3000,
  language = 'en',
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const content = {
    en: {
      close: 'Close',
    },
    bn: {
      close: 'বন্ধ করুন',
    },
  };

  const currentContent = content[language];

  // Handle timer and progress bar
  useEffect(() => {
    if (show && !isPaused) {
      const startTime = Date.now();
      const interval = 50; // Update progress every 50ms
      const totalDuration = duration;

      timerRef.current = setTimeout(() => {
        onClose();
      }, totalDuration);

      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalDuration - elapsed);
        setProgress((remaining / totalDuration) * 100);
      }, interval);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
      };
    }
  }, [show, isPaused, duration, onClose]);

  // Pause timer on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  // Resume timer on leave
  const handleMouseLeave = () => {
    if (show) {
      setIsPaused(false);
      const remainingTime = (progress / 100) * duration;
      const startTime = Date.now();

      timerRef.current = setTimeout(() => {
        onClose();
      }, remainingTime);

      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, remainingTime - elapsed);
        setProgress((remaining / remainingTime) * 100);
      }, 50);
    }
  };

  if (!show) return null;

  // Determine toast styling based on type
  const typeStyles = {
    success: {
      icon: <CheckCircle className="text-green-500" size={20} />,
      bg: 'bg-gradient-to-r from-green-500/20 to-green-700/20',
      border: darkMode ? 'border-green-700' : 'border-green-300',
    },
    error: {
      icon: <AlertCircle className="text-red-500" size={20} />,
      bg: 'bg-gradient-to-r from-red-500/20 to-red-700/20',
      border: darkMode ? 'border-red-700' : 'border-red-300',
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-500" size={20} />,
      bg: 'bg-gradient-to-r from-yellow-500/20 to-yellow-700/20',
      border: darkMode ? 'border-yellow-700' : 'border-yellow-300',
    },
    info: {
      icon: <Info className="text-blue-500" size={20} />,
      bg: 'bg-gradient-to-r from-blue-500/20 to-blue-700/20',
      border: darkMode ? 'border-blue-700' : 'border-blue-300',
    },
  };

  // Determine position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={`fixed z-50 animate-slide-in ${positionClasses[position]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="assertive"
      aria-label={type.charAt(0).toUpperCase() + type.slice(1) + ' notification'}
    >
      <div
        className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-800/80' : 'bg-white/80'
        } backdrop-blur-md border ${typeStyles[type].border} ${typeStyles[type].bg} max-w-sm w-full group`}
      >
        {typeStyles[type].icon}
        <span
          className={`font-medium text-base ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          {message}
        </span>
        <button
          onClick={onClose}
          className={`p-1 rounded-full transition-all duration-200 ${
            darkMode
              ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
          } group-hover:scale-110`}
          aria-label={currentContent.close}
        >
          <X size={16} />
        </button>
        {/* Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-50"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;