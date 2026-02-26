
import React from 'react';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-primary/20 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-primary mix-blend-screen" />
              </div>
              <span className="text-xl font-bold tracking-tight">InvoiceFlow</span>
            </div>
            <p className="text-muted/80 mb-6 leading-relaxed pr-4">
              La forma moderna de crear y enviar facturas profesionales de manera eficiente.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-background/90 tracking-wide">Productos</h3>
            <ul className="space-y-3 text-muted/70">
              <li><a href="#" className="hover:text-primary transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Plantillas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-background/90 tracking-wide">Empresa</h3>
            <ul className="space-y-3 text-muted/70">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trabajos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-background/90 tracking-wide">Soporte</h3>
            <ul className="space-y-3 text-muted/70">
              <li><a href="#" className="hover:text-primary transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentación de la API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Estado</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seguridad</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted/60 text-sm">
          <p>&copy; {new Date().getFullYear()} InvoiceFlow. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
