
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
      title: 'Autopilot para tus cobros',
      description: 'Genera facturas pre-rellenadas en segundos con nuestro sistema Predictivo.'
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
      title: 'Control Total en Tiempo Real',
      description: 'Monitorea qué clientes te deben, previsión de ingresos y estado de tus presupuestos.'
    },
    {
      icon: CreditCard,
      title: 'Integración de pagos',
      description: 'Aceptar pagos en línea con integraciones Stripe, PayPal y más.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Todo lo que necesitas para que te paguen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Funcionalidades poderosas diseñadas para simplificar tu facturación y acelerar tu flujo de caja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50 group backdrop-blur-sm cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-primary/20 group-hover:bg-primary">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
