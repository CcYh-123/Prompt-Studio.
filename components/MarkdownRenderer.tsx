
import React from 'react';

interface MarkdownRendererProps {
  text: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
  // Split by bold markers (**...**), keeping the markers in the resulting array
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(part => part);

  return (
    <>
      {parts.map((part, index) => {
        // If the part is enclosed in **, style it as a strong tag
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-teal-300">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Otherwise, render it as plain text
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};
