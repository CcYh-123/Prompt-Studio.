
export interface TextPromptParts {
  rol: string;
  tarea: string;
  contexto: string;
  formato: string;
  tono: string;
  detalles: string;
}

export interface ImagePromptParts {
  sujeto: string;
  accion: string;
  entorno: string;
  estilo: string;
  calidad: string;
  parametros: string;
}

export interface VideoPromptParts {
  escena: string;
  tipo_plano: string;
  movimiento_camara: string;
  estilo_visual: string;
  duracion: string;
  detalles_extra: string;
}

export interface SoundPromptParts {
  tipo_sonido: string;
  descripcion: string;
  emocion: string;
  genero_musical: string;
  instrumentos: string;
  referencias: string;
}

export interface CodePromptParts {
  lenguaje: string;
  framework: string;
  tarea_codigo: string;
  funcionalidad: string;
  restricciones: string;
  ejemplo: string;
}

export type AllPromptParts = {
  Texto: TextPromptParts;
  Imagen: ImagePromptParts;
  Video: VideoPromptParts;
  Sonido: SoundPromptParts;
  Código: CodePromptParts;
};

export type PromptCategory = keyof AllPromptParts;

export interface LibraryItem {
  id: string;
  prompt: string;
  category: PromptCategory;
  timestamp: string;
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  name: string;
}

export interface UploadedVideo {
  base64: string;
  mimeType: string;
  name: string;
}

export interface UploadedText {
  content: string;
  name: string;
}
