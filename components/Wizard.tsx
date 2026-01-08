import React, { useState, useEffect } from 'react';
import type { PromptCategory } from '../types';
import { INITIAL_PROMPTS, SUGGESTIONS, CODE_SUGGESTIONS_MAP } from '../constants';

interface WizardProps {
  category: PromptCategory;
  onClose: () => void;
  onSubmit: (answers: Record<string, string>) => void;
}

const FRIENDLY_LABELS: Record<string, string> = {
    rol: "¿Qué rol debe adoptar la IA?",
    tarea: "¿Cuál es la tarea principal que debe realizar?",
    contexto: "¿Cuál es el contexto o la situación?",
    formato: "¿En qué formato quieres la respuesta?",
    tono: "¿Qué tono de voz debe usar?",
    detalles: "Añade cualquier detalle o requisito específico.",
    sujeto: "¿Qué es lo principal que quieres ver en la imagen?",
    accion: "¿Qué está haciendo el sujeto?",
    entorno: "¿Dónde se encuentra el sujeto?",
    estilo: "¿Qué estilo artístico prefieres?",
    calidad: "¿Qué nivel de calidad o detalle buscas?",
    parametros: "Si conoces parámetros técnicos, añádelos aquí.",
    escena: "¿Cuál es la escena principal del video?",
    tipo_plano: "¿Qué tipo de plano de cámara quieres?",
    movimiento_camara: "¿Cómo se debe mover la cámara?",
    estilo_visual: "¿Qué estilo visual general buscas?",
    duracion: "¿Cuánto debe durar el clip?",
    detalles_extra: "Añade detalles extra como efectos o música.",
    tipo_sonido: "¿Qué tipo de sonido necesitas?",
    descripcion: "Describe el sonido que imaginas.",
    emocion: "¿Qué emoción debe evocar el sonido?",
    genero_musical: "Si es música, ¿de qué género?",
    instrumentos: "¿Qué instrumentos deben sonar?",
    referencias: "Nombra alguna referencia musical o de sonido.",
    lenguaje: "¿En qué lenguaje de programación?",
    framework: "¿Usarás algún framework o librería?",
    tarea_codigo: "¿Cuál es la tarea específica a codificar?",
    funcionalidad: "Describe la funcionalidad que necesitas.",
    restricciones: "¿Hay alguna restricción o requisito?",
    ejemplo: "Proporciona un pequeño ejemplo si es posible."
};

export const Wizard: React.FC<WizardProps> = ({ category, onClose, onSubmit }) => {
  const [fields, setFields] = useState(Object.keys(INITIAL_PROMPTS[category]));
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => 
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
  );

  useEffect(() => {
    // Reset state when the category changes to ensure a fresh start
    const newFields = Object.keys(INITIAL_PROMPTS[category]);
    setFields(newFields);
    setCurrentStep(0);
    setAnswers(newFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));
  }, [category]);

  const currentField = fields[currentStep];
  const totalSteps = fields.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newAnswers = { ...answers, [name]: value };

    // If the language is changed, clear subsequent fields to avoid inconsistent suggestions
    if (name === 'lenguaje') {
      fields.forEach((field, index) => {
        if (index > currentStep) {
          newAnswers[field] = '';
        }
      });
    }
    setAnswers(newAnswers);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setAnswers(prev => ({...prev, [currentField]: suggestion}));
  };

  const selectedLanguage = answers.lenguaje;
  let suggestionsForCurrentField: string[];

  if (category === 'Código' && currentField !== 'lenguaje' && selectedLanguage && CODE_SUGGESTIONS_MAP[selectedLanguage]) {
      suggestionsForCurrentField = CODE_SUGGESTIONS_MAP[selectedLanguage][currentField as keyof typeof CODE_SUGGESTIONS_MAP[string]] || [];
  } else {
      suggestionsForCurrentField = (SUGGESTIONS[category] as Record<string, string[]>)[currentField] || [];
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 font-bold rounded-full text-sm">🧙‍♂️</span>
          <h2 className="text-xl font-bold text-gray-800">Modo Mago</h2>
        </div>
        <button onClick={onClose} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">SALIR</button>
      </div>
      
      {/* Progress Bar */}
      <div className="my-6">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
            <span>Paso {currentStep + 1} de {totalSteps}</span>
            <span>{currentField.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease-in-out' }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <label htmlFor={currentField} className="block text-md font-semibold text-gray-700 mb-3 text-center">
            {FRIENDLY_LABELS[currentField] || currentField}
        </label>
        <textarea
          id={currentField}
          name={currentField}
          rows={3}
          className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          value={answers[currentField]}
          onChange={handleAnswerChange}
          placeholder={`EJ: ${suggestionsForCurrentField[0] || ''}`}
        />
         <div className="flex flex-wrap gap-2 mt-2">
          {suggestionsForCurrentField.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button 
          onClick={handleBack} 
          disabled={currentStep === 0}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button 
          onClick={handleNext}
          className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};