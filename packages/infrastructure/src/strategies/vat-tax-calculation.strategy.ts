import { Injectable } from '@nestjs/common';
import { ITaxCalculationStrategy, ItemCalculationData, ItemCalculationResult } from '@repo/core';

@Injectable()
export class VatTaxCalculationStrategy implements ITaxCalculationStrategy {
  calculate(input: ItemCalculationData): ItemCalculationResult {
    const subtotal = input.unitPrice.multiply(input.quantity);
    const taxAmount = subtotal.multiply(input.taxRate / 100);
    const total = subtotal.add(taxAmount);

    return { subtotal, taxAmount, total };
  }
}
