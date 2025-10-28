
"use client";
import React from 'react';

import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export type TemplateType = 'modern' | 'classic' | 'minimal';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateSelect: (template: TemplateType) => void;
}

const templates = [
  {
    id: 'modern' as TemplateType,
    name: 'Modern',
    description: 'Diseño moderno con acentos azules',
    preview: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    id: 'classic' as TemplateType,
    name: 'Classic',
    description: 'Layout tradicional de profesional',
    preview: 'bg-gradient-to-br from-gray-50 to-gray-100'
  },
  {
    id: 'minimal' as TemplateType,
    name: 'Minimal',
    description: 'Diseño simple y elegante',
    preview: 'bg-gradient-to-br from-emerald-50 to-emerald-100'
  }
];

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Elige tu plantilla</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className={`h-20 rounded mb-3 ${template.preview}`} />
              <h3 className="font-medium text-sm">{template.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
