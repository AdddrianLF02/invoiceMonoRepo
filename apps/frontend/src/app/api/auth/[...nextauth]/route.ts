import { handlers } from "../../../../../auth";


// Forzar el uso del runtime de Node.js para evitar errores con librerías incompatibles con el Edge
export const runtime = "nodejs"; 

export const { GET, POST } = handlers;
