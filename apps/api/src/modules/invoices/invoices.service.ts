import { Injectable } from '@nestjs/common';
@Injectable()
export class InvoicesService {
  async getInvoice(contractId: string) {
    return {
      invoiceNumber: `INV-${contractId.substring(0, 8).toUpperCase()}`,
      contractId,
      platformFee: 50.0,
      feeDescription: 'رسم ثابت لمنصة Satcom Engineers',
      tax: 0,
      total: 50.0,
    };
  }
}