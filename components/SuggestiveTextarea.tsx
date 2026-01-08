
import React from 'react';

interface SuggestiveTextareaProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  suggestions: string[];
  onChange: (name: string, value: string) => void;
}

export const SuggestiveTextarea: React.FC<SuggestiveTextareaProps> = ({
  label,
  name,
  value,
  placeholder,
  suggestions,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={2}
        className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(name, suggestion)}
              className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-md hover:bg-teal-100 hover:text-teal-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
