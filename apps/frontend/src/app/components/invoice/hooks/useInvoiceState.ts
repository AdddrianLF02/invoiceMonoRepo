"use client"

import { useReducer } from 'react';
import { TemplateType } from '../../TemplateSelector';

// Definición de tipos
export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  notes: string;
}

export interface InvoiceState {
  selectedTemplate: TemplateType;
  invoiceData: InvoiceData;
  items: InvoiceItem[];
}

// Tipos de acciones
export type InvoiceAction =
  | { type: 'SET_TEMPLATE'; payload: TemplateType }
  | { type: 'UPDATE_INVOICE_DATA'; field: keyof InvoiceData; value: string }
  | { type: 'ADD_ITEM' }
  | { type: 'REMOVE_ITEM'; index: number }
  | { type: 'UPDATE_ITEM'; index: number; field: keyof InvoiceItem; value: string | number };

// Estado inicial
const initialState: InvoiceState = {
  selectedTemplate: 'modern',
  invoiceData: {
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    fromName: '',
    fromEmail: '',
    fromAddress: '',
    toName: '',
    toEmail: '',
    toAddress: '',
    notes: ''
  },
  items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
};

// Reducer
function invoiceReducer(state: InvoiceState, action: InvoiceAction): InvoiceState {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload
      };
    
    case 'UPDATE_INVOICE_DATA':
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          [action.field]: action.value
        }
      };
    
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.index)
      };
    
    case 'UPDATE_ITEM': {
      const updatedItems = [...state.items];
      updatedItems[action.index] = { 
        ...updatedItems[action.index], 
        [action.field]: action.value 
      };
      

      if (action.field === 'quantity' || action.field === 'rate') {
        const item = updatedItems[action.index];
        updatedItems[action.index].amount = item.quantity * item.rate;
      }
      
      return {
        ...state,
        items: updatedItems
      };
    }
    
    default:
      return state;
  }
}

export const useInvoiceState = () => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  
  // Cálculos derivados del estado
  const subtotal = state.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return {
    state,
    dispatch,
    calculations: {
      subtotal,
      tax,
      total
    }
  };
};

export default useInvoiceState;