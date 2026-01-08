
import { GoogleGenAI } from "@google/genai";
import type { PromptCategory } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (category: PromptCategory): string => {
  const baseInstruction = `
    Actúa como un "Prompt Architect" de clase mundial. Tu tarea es tomar el siguiente borrador de prompt y transformarlo en un "Súper Prompt" de alta calidad.
    El Súper Prompt debe ser técnico, ultra-detallado, y estar estructurado de forma que maximice la claridad y la eficacia para un modelo de IA generativa.
    No respondas a la solicitud del usuario, en su lugar, re-escribe y mejora el prompt en sí mismo para que sea lo más perfecto posible.
    Elimina cualquier sección que diga "No especificado" o "Ninguno". Expande las secciones existentes con detalles relevantes y sugerencias que enriquezcan la solicitud original.
    La salida final debe ser únicamente el prompt mejorado, sin preámbulos, explicaciones ni formato de markdown.
    `;
    
    const categorySpecifics: Record<PromptCategory, string> = {
        Texto: "Enfócate en la estructura narrativa, la claridad de la tarea, el público objetivo y la voz. Define un formato de salida claro y conciso.",
        Imagen: "Añade detalles visuales extremos: composición, tipo de cámara y lente, iluminación (global, key, fill, rim light), paleta de colores, texturas, nivel de detalle y parámetros técnicos como --ar, --v, --style. Describe la atmósfera y la emoción.",
        Video: "Detalla el tipo de plano, movimiento de cámara, edición (cortes, transiciones), etalonaje (color grading), efectos visuales (VFX), y diseño de sonido. Estructura la salida como un guion técnico si es posible.",
        Sonido: "Especifica el timbre, la dinámica, el ritmo, y la instrumentación. Describe el entorno acústico (reverb, eco) y la calidad de producción. Si es música, define la estructura (verso, estribillo).",
        Código: "Especifica el lenguaje y las librerías con versiones. Define claramente la arquitectura, las entradas y salidas de la función, el manejo de errores y casos límite. Incluye comentarios en el código para explicar la lógica.",
    };

    return `${baseInstruction}\nInstrucciones específicas para la categoría '${category}': ${categorySpecifics[category]}`;
}


export const enhancePrompt = async (
    promptToEnhance: string, 
    category: PromptCategory,
    onStreamUpdate: (chunk: string) => void
): Promise<void> => {
  const metaPrompt = `
    ${getSystemInstruction(category)}

    Borrador del prompt a mejorar:
    ---
    ${promptToEnhance}
    ---

    Súper Prompt resultante:
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-pro-preview",
        contents: metaPrompt,
        config: {
            temperature: 0.5,
        },
    });

    for await (const chunk of responseStream) {
        if(chunk.text) {
            onStreamUpdate(chunk.text);
        }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudo mejorar el prompt con IA. Inténtalo de nuevo.");
  }
};
