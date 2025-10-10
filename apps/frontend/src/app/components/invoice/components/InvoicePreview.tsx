"use client"

import React from 'react';
import ModernTemplate from '../../templates/ModernTemplate';
import ClassicTemplate from '../../templates/ClassicTemplate';
import MinimalTemplate from '../../templates/MinimalTemplate';
import { InvoiceState } from '../hooks/useInvoiceState';

interface InvoicePreviewProps {
  state: InvoiceState;
  subtotal: number;
  tax: number;
  total: number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ state, subtotal, tax, total }) => {
  const { selectedTemplate, invoiceData, items } = state;
  
  const templateProps = { invoiceData, items, subtotal, tax, total };
  
  return (
    <div id="invoice-preview" className="bg-white shadow-lg rounded-lg overflow-hidden">
      {selectedTemplate === 'classic' && <ClassicTemplate {...templateProps} />}
      {selectedTemplate === 'minimal' && <MinimalTemplate {...templateProps} />}
      {selectedTemplate === 'modern' && <ModernTemplate {...templateProps} />}
    </div>
  );
};

export default InvoicePreview;