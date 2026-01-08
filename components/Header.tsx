
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">
            Extraordinary Prompt <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">Architect</span>
          </h1>
          <p className="text-xs font-bold text-gray-400 tracking-widest mt-1">
            ESCULPE, PULE Y REFINA HASTA LA PERFECCIÓN
          </p>
        </div>
      </div>
    </header>
  );
};
