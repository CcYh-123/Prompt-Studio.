
import type { AllPromptParts, PromptCategory } from "./types";

export const INITIAL_PROMPTS: AllPromptParts = {
  Texto: { rol: '', tarea: '', contexto: '', formato: '', tono: '', detalles: '' },
  Imagen: { sujeto: '', accion: '', entorno: '', estilo: '', calidad: '', parametros: '' },
  Video: { escena: '', tipo_plano: '', movimiento_camara: '', estilo_visual: '', duracion: '', detalles_extra: '' },
  Sonido: { tipo_sonido: '', descripcion: '', emocion: '', genero_musical: '', instrumentos: '', referencias: '' },
  Código: { lenguaje: '', framework: '', tarea_codigo: '', funcionalidad: '', restricciones: '', ejemplo: '' },
};

type SuggestionsMap = {
  [K in PromptCategory]: { [P in keyof AllPromptParts[K]]: string[] };
};

export const SUGGESTIONS: SuggestionsMap = {
  Texto: {
    rol: ["Experto en marketing digital", "Escritor creativo", "Analista de negocios", "Tutor académico", "Guionista de cine", "Historiador", "Asistente de programación", "Generador de datos de prueba", "Revisor de código experto", "Creador de documentación técnica", "Estratega de contenido SEO"],
    tarea: ["Crear una campaña de lanzamiento", "Escribir un artículo de blog", "Generar un informe de mercado", "Explicar un concepto complejo", "Desarrollar un diálogo", "Resumir un evento histórico"],
    contexto: ["Para una nueva app de fitness", "En un blog sobre tecnología", "Para una presentación a inversores", "Para un estudiante de secundaria", "En una escena de comedia romántica", "Para un documental"],
    formato: ["Lista de puntos clave", "Párrafos narrativos", "Tabla comparativa", "Respuesta a pregunta y respuesta", "Guion técnico", "Cronología detallada"],
    tono: ["Profesional y persuasivo", "Casual y amigable", "Analítico y basado en datos", "Didáctico y claro", "Humorístico e ingenioso", "Serio y formal"],
    detalles: ["Incluir 3 llamadas a la acción", "Longitud de 500 palabras", "Con citas y fuentes", "Usar analogías simples", "El personaje A es optimista", "Mencionar figuras clave"],
  },
  Imagen: {
    sujeto: ["Un astronauta", "Un zorro rojo místico", "Una ciudad flotante", "Un robot antiguo", "Una reina guerrera", "Un dragón de cristal"],
    accion: ["Descansando en la luna", "Saltando sobre charcos de neón", "Amaneciendo entre las nubes", "Cubierto de musgo en una selva", "Liderando un ejército", "Durmiendo en una cueva de gemas"],
    entorno: ["Superficie lunar con la Tierra al fondo", "Calle lluviosa de una ciudad ciberpunk", "Cielo con nubes doradas y púrpuras", "Selva densa y misteriosa", "Campo de batalla medieval", "Cueva subterránea brillante"],
    estilo: ["Fotorrealista", "Arte digital de fantasía", "Estilo Ghibli", "Pixel art", "Acuarela impresionista", "Modelo 3D, render de Octane"],
    calidad: ["Ultra detallado, 8K, HDR", "Enfocado, calidad profesional", "Iluminación cinematográfica", "Colores vibrantes", "Texturas intrincadas", "Calidad de concurso"],
    parametros: ["--ar 16:9", "--style raw", "--v 6.0", "--chaos 10", "--stylize 750", "--weird 250"],
  },
  Video: {
    escena: ["Persecución de coches en una ciudad nocturna", "Dos personas conversando en un café", "Un dron sobrevolando un paisaje montañoso", "Time-lapse de una flor abriéndose", "Animación de un logo corporativo", "Documental de vida salvaje"],
    tipo_plano: ["Plano general extremo", "Primer plano (close-up)", "Plano medio", "Plano cenital", "Plano subjetivo (POV)", "Plano holandés"],
    movimiento_camara: ["Travelling lateral", "Zoom in lento", "Cámara en mano temblorosa", "Movimiento de grúa ascendente", "Panorámica de 360 grados", "Corte rápido (jump cut)"],
    estilo_visual: ["Cinematográfico, grano de película", "Estilo de documental de la BBC", "Look de ciencia ficción de los 80", "Blanco y negro, noir", "Colores saturados tipo Wes Anderson", "Video de GoPro, acción"],
    duracion: ["Clip corto de 5 segundos", "Secuencia de 15 segundos", "Anuncio de 30 segundos", "Introducción de 10 segundos", "Bucle infinito (loop)", "Escena de 1 minuto"],
    detalles_extra: ["Con lens flare anamórfico", "A cámara lenta (slow motion)", "Con efectos de partículas y humo", "Transiciones suaves", "Música épica de fondo", "Narración en off"],
  },
  Sonido: {
    tipo_sonido: ["Efecto de sonido (SFX)", "Paisaje sonoro (Ambiance)", "Pista musical", "Sonido para UI/UX", "Voz en off", "Jingle de marca"],
    descripcion: ["Pasos en un bosque de noche", "Lluvia en una ventana", "Explosión futurista", "Notificación de mensaje nuevo", "Voz de anciano sabio", "Melodía pegadiza y optimista"],
    emocion: ["Misterio y suspense", "Calma y relajación", "Épico y heroico", "Satisfactorio y sutil", "Sabiduría y confianza", "Alegría y energía"],
    genero_musical: ["Orquestal cinemático", "Lo-fi hip hop", "Synthwave", "Música ambiental (ambient)", "Rock electrónico", "Pop acústico"],
    instrumentos: ["Cuerdas y metales", "Piano eléctrico y batería", "Sintetizadores y arpegiadores", "Pads atmosféricos y sonidos de la naturaleza", "Guitarra eléctrica y bajo", "Guitarra acústica y voz"],
    referencias: ["Similar a Hans Zimmer", "Como una pista de Nujabes", "Estilo Blade Runner", "Inspirado en Brian Eno", "Al estilo de Daft Punk", "Como Ed Sheeran"],
  },
  Código: {
    lenguaje: ["JavaScript (Web interactiva)", "Python (Análisis de datos, backend)", "HTML/CSS (Estructura y estilo web)", "SQL (Consultas a bases de datos)", "TypeScript (JavaScript con tipos estáticos)", "Bash (Scripts de terminal)", "Go (Sistemas concurrentes de alto rendimiento)", "Rust (Sistemas seguros y rápidos)", "PHP (Desarrollo web del lado del servidor)", "C# (Aplicaciones en el ecosistema .NET)", "Kotlin (Desarrollo moderno para Android y más)", "Swift (Aplicaciones para ecosistema Apple)"],
    framework: ["React (Librería para interfaces de usuario)", "Django (Framework Python para web)", "Tailwind CSS (Framework CSS de utilidad)", "Ninguno (Sin dependencias externas)", "Next.js (Framework React para producción)", "Express.js (Framework minimalista para APIs con Node.js)", "Vue.js (Framework progresivo para UI)", "Laravel (Framework PHP elegante para web)", "Svelte (Compilador para construir UIs rápidas)", "Angular (Plataforma para aplicaciones web empresariales)", "FastAPI (Framework moderno para APIs en Python)", "Ruby on Rails (Framework para desarrollo web rápido)"],
    tarea_codigo: ["Crear un componente de UI (Elemento visual reutilizable)", "Escribir una función de backend (Lógica que corre en el servidor)", "Diseñar un layout web (Estructura visual de una página)", "Generar una consulta a base de datos (Pedir datos específicos a una DB)", "Definir tipos de datos (Crear contratos para la estructura de datos)", "Crear un script de automatización (Ejecutar tareas repetitivas automáticamente)", "Implementar un endpoint API (Punto de comunicación para el backend)", "Configurar un pipeline CI/CD (Automatizar integración y despliegue)", "Escribir pruebas unitarias (Verificar que una parte del código funciona)", "Refactorizar código existente (Mejorar código sin cambiar su función)", "Optimizar rendimiento (Hacer que el código sea más rápido)", "Depurar un error específico (Encontrar y solucionar un bug)"],
    funcionalidad: ["Un botón de 'Me Gusta' (Interacción social básica)", "Una API que devuelve datos de usuario (Servicio para obtener información)", "Una landing page responsiva (Página que se adapta a pantallas)", "Seleccionar todos los usuarios de España (Consulta para filtrar datos geográficos)", "La interfaz para un objeto 'Producto' (Definición de la estructura de un producto)", "Un script que renombre archivos (Herramienta para organizar ficheros)", "Formulario de subida de archivos (Permitir a usuarios enviar ficheros)", "Autenticación con JWT (Sistema de login seguro y sin estado)", "Paginación para una lista (Dividir grandes listas en páginas)", "Carrito de compras (Gestionar productos antes de la compra)", "Búsqueda en tiempo real (Filtrar resultados mientras se escribe)", "Dashboard con gráficos (Panel para visualizar datos y métricas)"],
    restricciones: ["Debe ser accesible (WCAG) (Usable por personas con discapacidades)", "Optimizado para bajo consumo de memoria (Eficiente en el uso de recursos)", "Sin librerías externas (Usar solo código nativo del lenguaje)", "Debe ser compatible con PostgreSQL (Funcionar con una base de datos específica)", "Usar tipos genéricos (Escribir código flexible y reutilizable)", "Debe manejar errores de permisos (Controlar acceso no autorizado)", "Seguir principios SOLID (Buenas prácticas de diseño de software)", "Cobertura de test del 90% (Asegurar que el 90% del código está probado)", "Validación de entrada estricta (Asegurar que los datos recibidos son correctos)", "Internacionalización (i18n) (Soportar múltiples idiomas)", "Seguir una guía de estilo (Mantener consistencia en el código)", "Ser idempotente (Múltiples llamadas producen el mismo resultado)"],
    ejemplo: ["useState hook para el estado (Manejar estado en componentes de React)", "Usando el ORM de Django (Interactuar con la DB usando objetos Python)", "Con un diseño mobile-first (Diseñar primero para móviles)", "JOIN con la tabla de 'pedidos' (Combinar datos de dos tablas en SQL)", "Incluir propiedades opcionales (Definir campos que pueden no estar presentes)", "Usar 'grep' y 'mv' (Comandos de terminal para buscar y mover)", "Usando async/await (Manejar operaciones asíncronas de forma legible)", "Middleware de autenticación (Verificar identidad antes de procesar una petición)", "Patrón de diseño Singleton (Asegurar una única instancia de una clase)", "Patrón de diseño Factory (Crear objetos sin especificar la clase exacta)", "Uso de 'localStorage' (Guardar datos permanentemente en el navegador)", "Llamada a API con 'fetch' (Obtener datos de un servidor web)"],
  }
};

type CodeSuggestions = {
  framework: string[];
  tarea_codigo: string[];
  funcionalidad: string[];
  restricciones: string[];
  ejemplo: string[];
}

export const CODE_SUGGESTIONS_MAP: Record<string, CodeSuggestions> = {
  "JavaScript (Web interactiva)": {
    framework: ["React (Librería para interfaces de usuario) (SUGERIDO)", "Next.js (Framework React para producción)", "Vue.js (Framework progresivo para UI)", "Express.js (Framework minimalista para APIs con Node.js)", "Svelte (Compilador para construir UIs rápidas)", "Ninguno (Sin dependencias externas)"],
    tarea_codigo: ["Crear un componente de UI (SUGERIDO)", "Implementar un endpoint API", "Escribir una función de utilidad", "Manejar eventos de usuario"],
    funcionalidad: ["Un botón de 'Me Gusta' con contador", "Llamada a API con 'fetch' para obtener datos (SUGERIDO)", "Formulario de login con validación", "Animación al hacer scroll"],
    restricciones: ["Seguir una guía de estilo (ESLint) (SUGERIDO)", "Sin librerías externas (Vanilla JS)", "Debe ser accesible (WCAG)", "Funcionar en navegadores modernos"],
    ejemplo: ["useState hook para el estado (React) (SUGERIDO)", "Usando async/await para llamadas asíncronas", "Manipulación del DOM (document.getElementById)", "Uso de 'localStorage' para guardar datos"],
  },
  "Python (Análisis de datos, backend)": {
    framework: ["Django (Framework web completo) (SUGERIDO)", "FastAPI (Framework moderno para APIs)", "Flask (Microframework para web)", "Pandas (Análisis de datos)", "NumPy (Computación científica)"],
    tarea_codigo: ["Escribir una función de backend (SUGERIDO)", "Implementar un endpoint API", "Procesar un archivo CSV", "Crear un script de automatización"],
    funcionalidad: ["Una API que devuelve datos de usuario (SUGERIDO)", "Un script que limpia y analiza datos", "Autenticación de usuario con JWT", "Generar un informe en PDF"],
    restricciones: ["Seguir el estilo de código PEP 8 (SUGERIDO)", "Usar entornos virtuales (venv)", "Optimizado para bajo consumo de memoria", "Validación de entrada estricta con Pydantic"],
    ejemplo: ["Usando el ORM de Django (SUGERIDO)", "Crear una ruta básica en FastAPI", "Leer un CSV con Pandas", "Manejo de excepciones (try...except)"],
  },
  "HTML/CSS (Estructura y estilo web)": {
    framework: ["Tailwind CSS (Framework CSS de utilidad) (SUGERIDO)", "Bootstrap (Framework de componentes UI)", "SASS (Preprocesador de CSS)", "Ninguno (HTML y CSS puros)"],
    tarea_codigo: ["Diseñar un layout web (SUGERIDO)", "Crear un componente de UI reutilizable", "Hacer una página responsiva", "Estilizar un formulario"],
    funcionalidad: ["Una landing page responsiva (SUGERIDO)", "Una galería de imágenes con Flexbox o Grid", "Un menú de navegación con dropdown", "Una tarjeta de perfil de usuario"],
    restricciones: ["Debe ser accesible (WCAG) (SUGERIDO)", "Con un diseño mobile-first", "Compatible con navegadores modernos", "Usar semántica de HTML5"],
    ejemplo: ["Uso de Flexbox para centrar elementos (SUGERIDO)", "Media queries para diseño responsivo", "Animaciones CSS en el evento 'hover'", "Uso de variables CSS para temas"],
  },
  "SQL (Consultas a bases de datos)": {
    framework: ["PostgreSQL (SUGERIDO)", "MySQL", "SQLite", "Microsoft SQL Server"],
    tarea_codigo: ["Generar una consulta a base de datos (SUGERIDO)", "Crear o modificar una tabla (DDL)", "Insertar o actualizar datos (DML)", "Optimizar una consulta lenta"],
    funcionalidad: ["Seleccionar todos los usuarios de un país (SUGERIDO)", "Obtener el total de ventas por mes", "Encontrar productos con bajo stock", "Crear un índice para acelerar búsquedas"],
    restricciones: ["La consulta debe ser eficiente", "Evitar inyección de SQL (usar parámetros) (SUGERIDO)", "Usar transacciones para operaciones críticas", "Compatible con una versión específica de SQL"],
    ejemplo: ["JOIN con la tabla de 'pedidos' (SUGERIDO)", "Uso de GROUP BY y COUNT()", "Filtrar resultados con WHERE", "Subconsultas para queries complejas"],
  },
  "TypeScript (JavaScript con tipos estáticos)": {
    framework: ["React con TypeScript (SUGERIDO)", "Next.js (con TypeScript)", "Angular (usa TS por defecto)", "Node.js con Express y TypeScript"],
    tarea_codigo: ["Definir tipos de datos (SUGERIDO)", "Crear un componente de UI fuertemente tipado", "Implementar un endpoint API con tipos", "Refactorizar JS a TS"],
    funcionalidad: ["La interfaz para un objeto 'Producto' (SUGERIDO)", "Un servicio que consume una API y valida la respuesta", "Un hook personalizado en React con tipos", "Clases y herencia para modelar datos"],
    restricciones: ["Usar tipos genéricos para reutilización (SUGERIDO)", "Configuración estricta de tsconfig.json", "Sin usar el tipo 'any'", "Documentación de tipos con TSDoc"],
    ejemplo: ["Definir una 'interface' o 'type' (SUGERIDO)", "Tipado de props en un componente React", "Uso de 'Utility Types' (Partial, Pick)", "Manejo de valores nulos o indefinidos"],
  },
  "Bash (Scripts de terminal)": {
    framework: ["Ninguno (Bash puro) (SUGERIDO)", "zsh (Z Shell)", "Awk (Procesamiento de texto)", "Sed (Editor de streams)"],
    tarea_codigo: ["Crear un script de automatización (SUGERIDO)", "Procesar archivos de texto", "Gestionar procesos del sistema", "Hacer copias de seguridad"],
    funcionalidad: ["Un script que renombre archivos en masa (SUGERIDO)", "Un script que busque texto en archivos recursivamente", "Automatizar el despliegue de una aplicación", "Monitorizar el uso de CPU o memoria"],
    restricciones: ["Debe ser compatible con Bash v4+", "Manejar errores y salir con código de estado (SUGERIDO)", "Ser idempotente", "Validar los argumentos de entrada"],
    ejemplo: ["Bucles 'for' para iterar archivos (SUGERIDO)", "Usar 'grep', 'sed' y 'awk'", "Pipes (|) para encadenar comandos", "Leer la entrada del usuario con 'read'"],
  },
  "Go (Sistemas concurrentes de alto rendimiento)": {
    framework: ["Gin (Framework web) (SUGERIDO)", "Gorilla/mux (Enrutador HTTP)", "Librería estándar (net/http)", "Cobra (CLI)"],
    tarea_codigo: ["Implementar un endpoint API (SUGERIDO)", "Crear un microservicio", "Escribir una herramienta de línea de comandos (CLI)", "Procesamiento de datos concurrente"],
    funcionalidad: ["Un servidor web simple que responda 'Hola Mundo'", "Una API RESTful para un CRUD de usuarios (SUGERIDO)", "Uso de Goroutines y Channels para concurrencia", "Leer y escribir archivos JSON"],
    restricciones: ["Manejo de errores explícito (if err != nil) (SUGERIDO)", "Seguir las convenciones de Go (go fmt)", "Escribir pruebas unitarias", "Uso de módulos de Go para dependencias"],
    ejemplo: ["Definir una 'struct' para datos (SUGERIDO)", "Iniciar un servidor HTTP", "Lanzar una Goroutine", "Decodificar JSON a una struct"],
  },
  "Rust (Sistemas seguros y rápidos)": {
    framework: ["Actix Web (Framework web) (SUGERIDO)", "Tokio (Runtime asíncrono)", "Serde (Serialización/Deserialización)", "Clap (CLI)"],
    tarea_codigo: ["Crear una API web de alto rendimiento (SUGERIDO)", "Escribir una herramienta de línea de comandos", "Procesamiento de datos a bajo nivel", "Crear una librería segura"],
    funcionalidad: ["Un endpoint API que devuelve JSON (SUGERIDO)", "Manejo de la propiedad y el préstamo (ownership & borrowing)", "Pattern matching para manejar diferentes casos", "Definir y usar traits para comportamiento compartido"],
    restricciones: ["El código debe compilar sin advertencias (SUGERIDO)", "Manejo de errores con 'Result' y 'Option'", "Evitar 'unsafe' a menos que sea necesario", "Uso de 'Cargo' para gestionar el proyecto"],
    ejemplo: ["Definir una 'struct' y una 'enum' (SUGERIDO)", "Usar Serde para serializar a JSON", "Leer argumentos de la línea de comandos con Clap", "Escribir una prueba unitaria simple"],
  },
  "PHP (Desarrollo web del lado del servidor)": {
    framework: ["Laravel (Framework elegante) (SUGERIDO)", "Symfony (Framework de componentes)", "Composer (Gestor de dependencias)", "PHPUnit (Pruebas)"],
    tarea_codigo: ["Implementar un endpoint API (SUGERIDO)", "Crear una aplicación web con CRUD", "Procesar un formulario", "Interactuar con una base de datos"],
    funcionalidad: ["Autenticación de usuario con sesiones (SUGERIDO)", "Un sistema de rutas para una API REST", "Subida de archivos al servidor", "Enviar un correo electrónico"],
    restricciones: ["Usar PHP 8+ (SUGERIDO)", "Seguir los estándares PSR", "Evitar inyección de SQL (usar sentencias preparadas)", "Usar el autocargador de Composer"],
    ejemplo: ["Definir una ruta en Laravel (SUGERIDO)", "Usar Eloquent (ORM de Laravel) para consultar la DB", "Crear una clase con su namespace", "Validar los datos de un formulario"],
  },
  "C# (Aplicaciones en el ecosistema .NET)": {
    framework: ["ASP.NET Core (Desarrollo web) (SUGERIDO)", "Entity Framework Core (ORM)", ".NET MAUI (Multiplataforma)", "Unity (Videojuegos)"],
    tarea_codigo: ["Crear una API web (SUGERIDO)", "Desarrollar una aplicación de escritorio", "Interactuar con una base de datos", "Escribir una librería de clases"],
    funcionalidad: ["Un controlador de API para un CRUD (SUGERIDO)", "Usar LINQ para consultar colecciones de datos", "Inyección de dependencias para desacoplar código", "Definir un modelo de datos con EF Core"],
    restricciones: ["Usar las últimas versiones de .NET (SUGERIDO)", "Seguir las convenciones de nomenclatura de Microsoft", "Manejo de excepciones con try-catch", "Usar async/await para operaciones I/O"],
    ejemplo: ["Crear una clase y sus propiedades (SUGERIDO)", "Definir un endpoint en un controlador de ASP.NET Core", "Consulta a base de datos con LINQ", "Inyectar un servicio en un constructor"],
  },
  "Kotlin (Desarrollo moderno para Android y más)": {
    framework: ["Jetpack Compose (UI para Android) (SUGERIDO)", "Ktor (Framework web asíncrono)", "Spring Boot (con soporte para Kotlin)", "Coroutines (Para concurrencia)"],
    tarea_codigo: ["Crear una pantalla de aplicación Android (SUGERIDO)", "Desarrollar un backend con Ktor", "Escribir una función de extensión", "Consumir una API REST"],
    funcionalidad: ["Una lista que se muestra en una app Android (SUGERIDO)", "Usar coroutines para llamadas de red asíncronas", "Una 'data class' para modelar datos", "Manejo de nulabilidad seguro"],
    restricciones: ["Seguir las guías de estilo de Kotlin (SUGERIDO)", "Usar 'val' sobre 'var' siempre que sea posible", "Aprovechar las funciones de la librería estándar", "Usar un ViewModel para la lógica de UI en Android"],
    ejemplo: ["Crear un Composable en Jetpack Compose (SUGERIDO)", "Lanzar una coroutine con 'launch' o 'async'", "Definir una 'data class'", "Uso del operador 'elvis' (?:) para nulos"],
  },
  "Swift (Aplicaciones para ecosistema Apple)": {
    framework: ["SwiftUI (Framework declarativo moderno) (SUGERIDO)", "UIKit (Framework imperativo tradicional)", "Combine (Manejo de eventos asíncronos)", "Core Data (Persistencia de datos)"],
    tarea_codigo: ["Crear una vista de UI (SUGERIDO)", "Implementar lógica de navegación", "Manejar datos de una API REST", "Persistir datos localmente"],
    funcionalidad: ["Una lista que se actualiza desde una API (SUGERIDO)", "Una pantalla de login con validación de texto", "Navegación entre dos pantallas", "Guardar preferencias de usuario"],
    restricciones: ["Seguir las guías de diseño de Apple (HIG) (SUGERIDO)", "Usar 'let' en lugar de 'var' para inmutabilidad", "Manejo de opcionales de forma segura", "Soportar modo oscuro y tamaños de fuente dinámicos"],
    ejemplo: ["Uso de @State y @Binding en SwiftUI (SUGERIDO)", "Decodificar JSON con Codable", "Llamada de red con URLSession y async/await", "Definir un protocolo para delegación"],
  },
};
