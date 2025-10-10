
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
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Precios simples y transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el plan perfecto para tu negocio. Sin cargos ocultos, sin sorpresas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border shadow-lg'} hover:shadow-xl transition-shadow duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  size="lg"
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Todos los planes incluyen una prueba gratuita de 14 días. No se requiere tarjeta de crédito.
          </p>
          <Button variant="outline" size="lg">
            Comparar todas las características
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
