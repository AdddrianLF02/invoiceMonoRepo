
import React from 'react';

import { FileText, Zap, Globe, Shield, BarChart, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: 'Plantillas profesionales',
      description: 'Elige entre una variedad de plantillas facturación estilizadas que se adapten a tu marca.'
    },
    {
      icon: Zap,
      title: 'Rápido y eficiente',
      description: 'Genera facturas en segundos con nuestra interfaz intuitiva y automatización inteligente.'
    },
    {
      icon: Globe,
      title: 'Multi-Currency',
      description: 'Soporte para 150+ monedas con cálculos automáticos de tasas de cambio.'
    },
    {
      icon: Shield,
      title: 'Seguridad y cumplimiento',
      description: 'Nivel de seguridad bancario con cumplimiento GDPR y respaldo automático de datos.'
    },
    {
      icon: BarChart,
      title: 'Dashboard de análisis',
      description: 'Rastrear pagos, monitorear flujo de caja y obtener información valiosa sobre tu negocio.'
    },
    {
      icon: CreditCard,
      title: 'Integración de pagos',
      description: 'Aceptar pagos en línea con integraciones Stripe, PayPal y más.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para que te paguen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Funcionalidades poderosas diseñadas para simplificar tu facturación y acelerar tu flujo de caja.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
