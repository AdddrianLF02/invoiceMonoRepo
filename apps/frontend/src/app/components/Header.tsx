
import React from 'react';

import { FileText, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { NavLink } from '../types/navTypes';

const Header = () => {
  const navLinks: NavLink[] = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">InvoiceFlow</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          
      
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:block">
              Login
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Empezar
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

