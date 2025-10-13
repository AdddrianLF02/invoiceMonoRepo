import * as React from 'react';

/**
 * Layout de Autenticación (Route Group: (auth))
 * Justificación: Este layout proporciona la estructura visual 
 * (fondo gris, centrado, tarjeta blanca) para las páginas de login y registro.
 * Al estar dentro de una Route Group, NO hereda ni muestra el Root Layout (Header, Sidebar, etc.).
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Estructura de diseño compartida: Pantalla completa, centrado, fondo gris.
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        {/* Aquí se renderizará el contenido de /login o /register */}
        {children}
      </div>
    </div>
  );
}