
import React from 'react';
import { SuggestiveTextarea } from './SuggestiveTextarea';
import { SUGGESTIONS, CODE_SUGGESTIONS_MAP } from '../constants';
import type { PromptCategory, AllPromptParts, UploadedImage, UploadedVideo, UploadedText, CodePromptParts } from '../types';

interface PromptBuilderProps {
  category: PromptCategory;
  parts: AllPromptParts[PromptCategory];
  onClear: () => void;
  onInputChange: (field: string, value: string) => void;
  onToggleWizard: () => void;
  uploadedImage: UploadedImage | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  uploadedVideo: UploadedVideo | null;
  onVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveVideo: () => void;
  uploadedText: UploadedText | null;
  onTextUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveText: () => void;
}

const Tooltip: React.FC<{text: string, children: React.ReactNode}> = ({text, children}) => (
    <span className="group relative">
      {children}
      <span className="absolute bottom-full mb-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
      </span>
    </span>
);

export const PromptBuilder: React.FC<PromptBuilderProps> = ({ 
  category, 
  parts, 
  onClear, 
  onInputChange, 
  onToggleWizard,
  uploadedImage, 
  onImageUpload, 
  onRemoveImage,
  uploadedVideo,
  onVideoUpload,
  onRemoveVideo,
  uploadedText,
  onTextUpload,
  onRemoveText
}) => {
  const suggestions = SUGGESTIONS[category];
  const fields = Object.keys(parts);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full text-sm">1</span>
          <h2 className="text-xl font-bold text-gray-800">Construye</h2>
           <Tooltip text="Aquí pones tus ideas iniciales. Rellena los campos para dar forma a tu prompt.">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0110 4a3 3 0 013 3c0 1.59-1.29 2.906-2.996 2.996a1 1 0 01-1.002-1.001A1 1 0 0110 9a1 1 0 00-1-1H8a1 1 0 000 2h1a1 1 0 011 1v.01a1 1 0 01-1 1H8a1 1 0 110-2h.004a1.002 1.002 0 01.998-1.001A3.001 3.001 0 017 10a3 3 0 013-3zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
            </Tooltip>
            <button onClick={onToggleWizard} className="ml-2 text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.006 4.006a.75.75 0 01.75-.75h.488a.75.75 0 01.75.75v.488a.75.75 0 01-.75.75h-.488a.75.75 0 01-.75-.75v-.488zM8.28 5.72a.75.75 0 00-1.06 1.06l.94.94a.75.75 0 101.06-1.06l-.94-.94zm-2.432.14a.75.75 0 01.688-.688l.488-.11a.75.75 0 01.865.865l-.11.488a.75.75 0 01-.688.688l-.488.11a.75.75 0 01-.865-.865l.11-.488zm10.29 2.432a.75.75 0 01-.688.688l-.488.11a.75.75 0 01-.865-.865l.11-.488a.75.75 0 01.688-.688l.488-.11a.75.75 0 01.865.865l-.11.488zM5.72 11.72a.75.75 0 10-1.06-1.06l-.94.94a.75.75 0 101.06 1.06l.94-.94zm2.56-2.432a.75.75 0 01.688-.688l.488-.11a.75.75 0 01.865.865l-.11.488a.75.75 0 01-.688.688l-.488.11a.75.75 0 01-.865-.865l.11-.488zm.087 6.087a.75.75 0 01.75.75v.488a.75.75 0 01-.75.75h-.488a.75.75 0 01-.75-.75v-.488a.75.75 0 01.75-.75h.488z" clipRule="evenodd" />
              </svg>
              Modo Mago
            </button>
        </div>
        <button onClick={onClear} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">LIMPIAR TODO</button>
      </div>
      <div className="space-y-4">
        {fields.map(field => {
          const label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          let fieldSuggestions: string[] = suggestions[field as keyof typeof suggestions] || [];
          
          if (category === 'Código') {
            const selectedLanguage = (parts as CodePromptParts).lenguaje;
            if (field !== 'lenguaje' && selectedLanguage && CODE_SUGGESTIONS_MAP[selectedLanguage]) {
               fieldSuggestions = CODE_SUGGESTIONS_MAP[selectedLanguage][field as keyof typeof CODE_SUGGESTIONS_MAP[string]] || [];
            }
          }

          const placeholder = `EJ: ${fieldSuggestions[0] || ''}`;
          const isTextContext = category === 'Texto' && field === 'contexto';
          const isImageSubject = category === 'Imagen' && field === 'sujeto';
          const isVideoScene = category === 'Video' && field === 'escena';

          if (isTextContext) { return ( <div key={field}><div className="flex items-center justify-between mb-2"><label htmlFor={field} className="block text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label><label htmlFor="text-upload" className="cursor-pointer text-teal-600 hover:text-teal-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></label><input id="text-upload" type="file" accept=".txt,.md" className="hidden" onChange={onTextUpload} /></div><SuggestiveTextarea label="" name={field} value={parts[field as keyof typeof parts] as string} placeholder={placeholder} suggestions={fieldSuggestions} onChange={onInputChange} />{uploadedText && ( <div className="mt-3 p-2 border-2 border-dashed border-gray-200 rounded-lg flex items-center gap-3"><div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><div className="flex-grow"><p className="text-xs font-bold text-gray-700 truncate">{uploadedText.name}</p><p className="text-xs text-gray-500">Archivo de texto</p></div><button onClick={onRemoveText} className="text-gray-400 hover:text-red-500 transition-colors p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></button></div>)}</div> ); }
          if (isImageSubject) { return ( <div key={field}><div className="flex items-center justify-between mb-2"><label htmlFor={field} className="block text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label><label htmlFor="image-upload" className="cursor-pointer text-teal-600 hover:text-teal-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></label><input id="image-upload" type="file" accept="image/*" className="hidden" onChange={onImageUpload} /></div><SuggestiveTextarea label="" name={field} value={parts[field as keyof typeof parts] as string} placeholder={placeholder} suggestions={fieldSuggestions} onChange={onInputChange} />{uploadedImage && ( <div className="mt-3 p-2 border-2 border-dashed border-gray-200 rounded-lg flex items-center gap-3"><img src={`data:${uploadedImage.mimeType};base64,${uploadedImage.base64}`} alt="Preview" className="w-12 h-12 rounded object-cover" /><div className="flex-grow"><p className="text-xs font-bold text-gray-700 truncate">{uploadedImage.name}</p><p className="text-xs text-gray-500">{uploadedImage.mimeType}</p></div><button onClick={onRemoveImage} className="text-gray-400 hover:text-red-500 transition-colors p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></button></div>)}</div> ); }
          if (isVideoScene) { return ( <div key={field}><div className="flex items-center justify-between mb-2"><label htmlFor={field} className="block text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label><label htmlFor="video-upload" className="cursor-pointer text-teal-600 hover:text-teal-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></label><input id="video-upload" type="file" accept="video/*" className="hidden" onChange={onVideoUpload} /></div><SuggestiveTextarea label="" name={field} value={parts[field as keyof typeof parts] as string} placeholder={placeholder} suggestions={fieldSuggestions} onChange={onInputChange} />{uploadedVideo && ( <div className="mt-3 p-2 border-2 border-dashed border-gray-200 rounded-lg flex items-center gap-3"><div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55a2 2 0 01.996 1.742V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-5.258a2 2 0 01.996-1.742L9 10m0 0l6 4.5M9 10l-6 4.5" /></svg></div><div className="flex-grow"><p className="text-xs font-bold text-gray-700 truncate">{uploadedVideo.name}</p><p className="text-xs text-gray-500">{uploadedVideo.mimeType}</p></div><button onClick={onRemoveVideo} className="text-gray-400 hover:text-red-500 transition-colors p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></button></div>)}</div> ); }

          return ( <div key={field}><SuggestiveTextarea label={label} name={field} value={parts[field as keyof typeof parts] as string} placeholder={placeholder} suggestions={fieldSuggestions} onChange={onInputChange} /></div> );
        })}
      </div>
    </div>
  );
};
