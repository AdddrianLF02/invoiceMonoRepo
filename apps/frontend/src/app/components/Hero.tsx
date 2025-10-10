"use client"
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';


const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crea 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Facturas </span>
            Profesionales
            en Minutos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Simplifica tu proceso de facturación con nuestro generador de facturas potente. 
            Crea, personaliza y envía facturas profesionales que te pagan más rápido.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            onClick={() => {
                window.location.href = '/register';
            }}
            >
              Comienza Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Prueba Gratis 14 Días
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No se requiere tarjeta de crédito
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Cancelar en cualquier momento
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
