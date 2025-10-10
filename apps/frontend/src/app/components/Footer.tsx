
import React from 'react';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">InvoiceFlow</span>
            </div>
            <p className="text-gray-400 mb-4">
             La forma moderna de crear y enviar facturas profesionales.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Productos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plantillas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabajos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentación de la API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Estado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 InvoiceFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
