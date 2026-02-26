
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
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">InvoiceFlow</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </nav>


          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:block">
              Login
            </Button>
            <Button className="shadow-sm">
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

