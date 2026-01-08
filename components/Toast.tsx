
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2800); // slightly less than App's timeout to allow fade-out
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-8 right-8 bg-gray-900 text-white font-bold py-3 px-5 rounded-lg shadow-2xl transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      {message}
    </div>
  );
};
