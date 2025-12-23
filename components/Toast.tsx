'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-400';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-400';
      default:
        return 'bg-gray-800 text-white border-gray-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div
      className={`px-6 py-4 rounded-xl shadow-2xl border-2 ${getStyles()} transform transition-all duration-300 min-w-[300px] max-w-md animate-slide-right`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getIcon()}</span>
          <p className="font-bold text-lg">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors font-bold text-xl"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

