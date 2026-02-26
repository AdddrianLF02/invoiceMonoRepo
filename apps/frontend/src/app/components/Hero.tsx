"use client"
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';


const Hero = () => {
  return (
    <section className="bg-linear-to-br from-background via-background to-secondary/30 py-20 relative overflow-hidden">
      {/* Subtle background glow effect for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Crea
            <span className="bg-linear-to-r from-primary to-info bg-clip-text text-transparent px-2"> Facturas </span>
            Profesionales
            en Minutos
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Simplifica tu proceso de facturación con nuestro generador de facturas potente.
            Crea, personaliza y envía facturas profesionales que te pagan más rápido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 cursor-pointer shadow-md hover:shadow-lg transition-all group"
              onClick={() => {
                window.location.href = '/register';
              }}
            >
              Comienza Gratis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              Prueba Gratis 14 Días
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              No se requiere tarjeta de crédito
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              Cancelar en cualquier momento
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
