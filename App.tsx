
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { Library } from './components/Library';
import { PromptBuilder } from './components/PromptBuilder';
import { Wizard } from './components/Wizard';
import { enhancePrompt } from './services/geminiService';
import { INITIAL_PROMPTS } from './constants';
import { EXAMPLE_PROMPT } from './example';
import type { AllPromptParts, LibraryItem, PromptCategory, UploadedImage, UploadedVideo, UploadedText } from './types';
import { Toast } from './components/Toast';
import { MarkdownRenderer } from './components/MarkdownRenderer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PromptCategory>('Texto');
  const [allPromptParts, setAllPromptParts] = useState<AllPromptParts>(INITIAL_PROMPTS);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<UploadedVideo | null>(null);
  const [uploadedText, setUploadedText] = useState<UploadedText | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isWizardMode, setIsWizardMode] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const isInitialLoad = useRef(true);

  // Load library from localStorage on initial render
  useEffect(() => {
    try {
      const savedLibrary = localStorage.getItem('promptArchitectLibrary');
      if (savedLibrary) {
        setLibrary(JSON.parse(savedLibrary));
      }
    } catch (e) {
      console.error("Failed to load library from localStorage", e);
    }
  }, []);

  // Persist library to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('promptArchitectLibrary', JSON.stringify(library));
    } catch (e) {
      console.error("Failed to save library to localStorage", e);
    }
  }, [library]);
  
  const currentPromptParts = useMemo(() => allPromptParts[activeTab], [allPromptParts, activeTab]);

  // Update final prompt in real-time as user types
  useEffect(() => {
    // Prevent overriding the loaded example prompt on the very first render
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const textReference = uploadedText && activeTab === 'Texto'
      ? `**Archivo de Contexto:** ${uploadedText.name}\n`
      : '';
    const imageReference = uploadedImage && activeTab === 'Imagen' 
      ? `**Imagen de Referencia:** ${uploadedImage.name}\n` 
      : '';
    const videoReference = uploadedVideo && activeTab === 'Video'
      ? `**Video de Referencia:** ${uploadedVideo.name}\n`
      : '';

    const parts = Object.entries(currentPromptParts)
      .map(([key, value]) => {
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return `**${formattedKey}:** ${value || 'No especificado'}`;
      })
      .join('\n');
    setFinalPrompt(textReference + imageReference + videoReference + parts);
  }, [currentPromptParts, uploadedImage, uploadedVideo, uploadedText, activeTab]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setAllPromptParts(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const handleClearAll = () => {
    setAllPromptParts(prev => ({ ...prev, [activeTab]: INITIAL_PROMPTS[activeTab] }));
    if (activeTab === 'Texto') setUploadedText(null);
    if (activeTab === 'Imagen') setUploadedImage(null);
    if (activeTab === 'Video') setUploadedVideo(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
      setUploadedImage({ base64: data, mimeType, name: file.name });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemoveImage = () => setUploadedImage(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
      setUploadedVideo({ base64: data, mimeType, name: file.name });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemoveVideo = () => setUploadedVideo(null);

  const handleTextUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedText({ content: result, name: file.name });
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleRemoveText = () => setUploadedText(null);

  const handleEnhance = async () => {
    if (!Object.values(currentPromptParts).some(part => String(part).trim() !== '') && !uploadedImage && !uploadedVideo && !uploadedText) {
      setError("Por favor, rellena al menos un campo o sube un archivo para mejorar el prompt.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    const promptToEnhance = finalPrompt;
    setIsLoading(true);
    setError(null);
    setFinalPrompt('');

    try {
      await enhancePrompt(promptToEnhance, activeTab, (chunk) => {
        setFinalPrompt(prevPrompt => prevPrompt + chunk);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      setFinalPrompt(promptToEnhance);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToLibrary = () => {
    if (!finalPrompt.trim() || finalPrompt.includes("No especificado")) {
        setError("No se puede guardar un prompt vacío o incompleto.");
        setTimeout(() => setError(null), 3000);
        return;
    }
    const newItem: LibraryItem = {
      id: crypto.randomUUID(),
      prompt: finalPrompt,
      category: activeTab,
      timestamp: new Date().toLocaleString('es-ES'),
    };
    setLibrary(prev => [newItem, ...prev]);
    showToast("¡Guardado en la biblioteca!");
  };

  const handleDeleteFromLibrary = (id: string) => {
    setLibrary(prev => prev.filter(item => item.id !== id));
    showToast("Prompt eliminado.");
  };

  const handleLoadFromLibrary = (item: LibraryItem) => {
    setActiveTab(item.category);
    setUploadedText(null);
    setUploadedImage(null);
    setUploadedVideo(null);
    isInitialLoad.current = true; 

    const initialPartsForCategory = INITIAL_PROMPTS[item.category];
    const originalKeys = Object.keys(initialPartsForCategory);
    const keyMap = new Map<string, string>();
    originalKeys.forEach(key => {
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        keyMap.set(formattedKey, key);
    });

    const newParts = { ...initialPartsForCategory };
    const lines = item.prompt.split('\n');
    let wasParsed = false;

    lines.forEach(line => {
        const match = line.match(/^\*\*(.*?)\*\*:\s*(.*)$/);
        if (match && match.length === 3) {
            const displayKey = match[1].trim();
            const value = match[2].trim();

            if (displayKey.startsWith("Archivo de") || displayKey.startsWith("Imagen de") || displayKey.startsWith("Video de") || value === 'No especificado' || value === '') {
                return;
            }
            const stateKey = keyMap.get(displayKey);
            if (stateKey && stateKey in newParts) {
                (newParts as any)[stateKey] = value;
                wasParsed = true;
            }
        }
    });

    if (wasParsed) {
        setAllPromptParts(prev => ({ ...prev, [item.category]: newParts }));
        const finalPromptFromParts = Object.entries(newParts)
          .map(([key, value]) => `**${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:** ${value || 'No especificado'}`)
          .join('\n');
        setFinalPrompt(finalPromptFromParts);
        showToast(`Prompt cargado en el constructor.`);
    } else {
        setAllPromptParts(prev => ({ ...prev, [item.category]: { ...INITIAL_PROMPTS[item.category] } }));
        setFinalPrompt(item.prompt);
        showToast(`Prompt mejorado cargado en el resultado.`);
    }
  };

  const handleLoadExample = () => handleLoadFromLibrary(EXAMPLE_PROMPT);
  const handleCopyToClipboard = () => {
    if(!finalPrompt || finalPrompt.includes("No especificado")) return;
    navigator.clipboard.writeText(finalPrompt);
    setIsCopied(true);
    showToast("¡Copiado al portapapeles!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExportLibrary = () => {
    if (library.length === 0) {
      showToast("La biblioteca está vacía.");
      return;
    }
    const blob = new Blob([JSON.stringify(library, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt-architect-library.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("¡Biblioteca exportada!");
  };

  const handleImportLibrary = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!window.confirm("Esto reemplazará tu biblioteca actual. ¿Estás seguro de que quieres continuar?")) {
      if(importInputRef.current) importInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const newLibrary = JSON.parse(content);
        const validCategories = Object.keys(INITIAL_PROMPTS);
        const isValidLibrary = Array.isArray(newLibrary) && newLibrary.every(item =>
          typeof item === 'object' && item !== null && 'id' in item && 'prompt' in item && 'category' in item && validCategories.includes(item.category) && 'timestamp' in item
        );

        if (isValidLibrary) {
          setLibrary(newLibrary);
          showToast("¡Biblioteca importada con éxito!");
        } else {
          throw new Error("Formato de archivo inválido o corrupto.");
        }
      } catch (err) {
        showToast("Error al importar: archivo inválido.");
      } finally {
         if(importInputRef.current) importInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const triggerImport = () => importInputRef.current?.click();
  const toggleWizardMode = () => setIsWizardMode(prev => !prev);

  const handleWizardSubmit = (answers: Record<string, string>) => {
    setAllPromptParts(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        ...answers,
      }
    }));
    setIsWizardMode(false);
    showToast("¡Tu prompt ha sido construido!");
  };

  const tabs: PromptCategory[] = ['Texto', 'Imagen', 'Video', 'Sonido', 'Código'];
  const Tooltip: React.FC<{text: string, children: React.ReactNode}> = ({text, children}) => (
    <span className="group relative">
      {children}
      <span className="absolute bottom-full mb-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
      </span>
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setIsWizardMode(false);
                  }}
                  className={`${ activeTab === tab ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors`}
                  aria-current={activeTab === tab ? 'page' : undefined}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
             {isWizardMode ? (
                <Wizard 
                  category={activeTab}
                  onClose={toggleWizardMode}
                  onSubmit={handleWizardSubmit}
                />
             ) : (
                <PromptBuilder
                  category={activeTab}
                  parts={currentPromptParts}
                  onClear={handleClearAll}
                  onInputChange={handleInputChange}
                  onToggleWizard={toggleWizardMode}
                  uploadedImage={uploadedImage} onImageUpload={handleImageUpload} onRemoveImage={handleRemoveImage}
                  uploadedVideo={uploadedVideo} onVideoUpload={handleVideoUpload} onRemoveVideo={handleRemoveVideo}
                  uploadedText={uploadedText} onTextUpload={handleTextUpload} onRemoveText={handleRemoveText}
                />
             )}

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-white/20 text-white font-bold rounded-full text-sm">4</span>
                    <h2 className="text-xl font-bold">Mejorar IA</h2>
                    <Tooltip text="Usa la IA de Gemini para transformar tus ideas en un prompt técnico y detallado.">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-200" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0110 4a3 3 0 013 3c0 1.59-1.29 2.906-2.996 2.996a1 1 0 01-1.002-1.001A1 1 0 0110 9a1 1 0 00-1-1H8a1 1 0 000 2h1a1 1 0 011 1v.01a1 1 0 01-1 1H8a1 1 0 110-2h.004a1.002 1.002 0 01.998-1.001A3.001 3.001 0 017 10a3 3 0 013-3zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                    </Tooltip>
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">GEMINI 3 PRO</span>
              </div>
              <p className="text-sm text-indigo-200 mb-6">Activa el modo "Architecto" para transformar tus notas en un Súper Prompt bíblico, técnico y ultra-detallado.</p>
              <button onClick={handleEnhance} disabled={isLoading} className="w-full bg-white text-indigo-600 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Mejorando...</>) : (<><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>Mejorar con IA</>)}
              </button>
              {error && <p className="text-xs text-red-300 mt-2 text-center">{error}</p>}
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex-grow flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full text-sm">2</span>
                    <h2 className="text-xl font-bold text-gray-800">Resultado Final</h2>
                    <Tooltip text="Esta es la vista previa de tu prompt. ¡Puedes copiarlo y usarlo desde aquí!">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0110 4a3 3 0 013 3c0 1.59-1.29 2.906-2.996 2.996a1 1 0 01-1.002-1.001A1 1 0 0110 9a1 1 0 00-1-1H8a1 1 0 000 2h1a1 1 0 011 1v.01a1 1 0 01-1 1H8a1 1 0 110-2h.004a1.002 1.002 0 01.998-1.001A3.001 3.001 0 017 10a3 3 0 013-3zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                    </Tooltip>
                  </div>
                   <div className="flex items-center gap-2">
                     <button onClick={handleCopyToClipboard} className="text-gray-400 hover:text-teal-600 transition-colors" title="Copiar al portapapeles">
                       {isCopied ? ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg> )}
                     </button>
                     <button onClick={handleSaveToLibrary} className="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors flex items-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>GUARDAR
                     </button>
                   </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 font-mono whitespace-pre-wrap flex-grow overflow-auto">
                {!Object.values(currentPromptParts).some(part => String(part).trim() !== '') && !uploadedImage && !uploadedVideo && !uploadedText && !finalPrompt ? <span className="text-gray-400">Esculpe algo en la sección 1 para comenzar, o carga un ejemplo desde la biblioteca...</span> : <MarkdownRenderer text={finalPrompt} /> }
              </div>
            </div>

            <Library 
              libraryItems={library} 
              onDelete={handleDeleteFromLibrary} 
              onLoad={handleLoadFromLibrary} 
              onImport={triggerImport}
              onExport={handleExportLibrary}
              onLoadExample={handleLoadExample}
            />
             <input type="file" ref={importInputRef} accept=".json" onChange={handleImportLibrary} className="hidden" />
          </div>
        </div>
      </main>
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
