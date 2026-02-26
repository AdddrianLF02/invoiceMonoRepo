
import React from 'react';

import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 9,
      period: 'month',
      description: 'Perfect for freelancers and small businesses',
      features: [
        'Up to 25 invoices per month',
        '5 clients',
        'Basic templates',
        'Email support',
        'PDF export'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 29,
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Unlimited invoices',
        'Unlimited clients',
        'Custom branding',
        'Payment reminders',
        'Analytics dashboard',
        'Priority support',
        'Multi-currency support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Advanced reporting',
        'API access',
        'Dedicated account manager',
        'Custom contracts',
        'White-label solution'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Precios simples y transparentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Elige el plan perfecto para tu negocio. Sin cargos ocultos, sin sorpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary shadow-2xl scale-105 z-10' : 'border-border/50 shadow-md'} bg-card hover:shadow-xl transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm">
                    <Star className="h-4 w-4 mr-1.5 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4 flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-foreground tracking-tight">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground font-medium h-10">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-success mr-3 shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full text-md py-6 ${plan.popular ? 'shadow-md shadow-primary/20 hover:shadow-lg' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6 font-medium">
            Todos los planes incluyen una prueba gratuita de 14 días. No se requiere tarjeta de crédito.
          </p>
          <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5" size="lg">
            Comparar todas las características
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
