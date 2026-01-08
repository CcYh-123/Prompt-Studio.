import React, { useState } from 'react';
import type { LibraryItem } from '../types';

interface LibraryProps {
  libraryItems: LibraryItem[];
  onDelete: (id: string) => void;
  onLoad: (item: LibraryItem) => void;
  onImport: () => void;
  onExport: () => void;
  onLoadExample: () => void;
}

export const Library: React.FC<LibraryProps> = ({ libraryItems, onDelete, onLoad, onImport, onExport, onLoadExample }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: LibraryItem) => {
    navigator.clipboard.writeText(item.prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 font-bold rounded-full text-sm">3</span>
          <h2 className="text-xl font-bold text-gray-800">Biblioteca</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onImport} title="Importar biblioteca" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-teal-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            Importar
          </button>
          <button onClick={onExport} title="Exportar biblioteca" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-teal-600 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg>
            Exportar
          </button>
        </div>
      </div>
      {libraryItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          <div className="inline-block bg-teal-100 p-3 rounded-full">
            <svg className="h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-800">Tu Biblioteca de Prompts</h3>
          <p className="mt-2 text-sm max-w-sm mx-auto">Aquí aparecerán tus Súper Prompts guardados. ¡Crea, guarda y reutiliza tus mejores ideas!</p>
          <button 
            onClick={onLoadExample}
            className="mt-6 bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors text-sm"
          >
            Cargar un Prompt de Ejemplo
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-auto pr-2 -mr-2">
          {libraryItems.map(item => (
            <div key={item.id} className="bg-gray-50 border border-gray-200 p-3 rounded-lg group hover:bg-teal-50 hover:border-teal-200 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{item.category}</span>
                   <p className="text-sm text-gray-600 mt-2 font-mono whitespace-pre-wrap truncate">{item.prompt}</p>
                </div>
                <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onLoad(item)} title="Cargar en el constructor" className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-100 rounded-md transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </button>
                  <button onClick={() => handleCopy(item)} title="Copiar prompt" className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-100 rounded-md transition-colors">
                    {copiedId === item.id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg>
                    )}
                  </button>
                  <button onClick={() => onDelete(item.id)} title="Eliminar prompt" className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-md transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{item.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
