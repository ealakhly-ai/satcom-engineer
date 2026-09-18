import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxInvoicesService {
  generateTaxInvoice(contractId: string, subtotal: number, buyerName: string, buyerVat?: string) {
    const vatRate = 0.15; // 15% VAT Standard
    const platformFee = 50.0;
    const vatAmount = (subtotal + platformFee) * vatRate;
    const total = subtotal + platformFee + vatAmount;

    // ZATCA standard Base64 TLV QR Code
    const qrData = Buffer.from(`Satcom Engineers|310000000000003|${new Date().toISOString()}|${total}|${vatAmount}`).toString('base64');

    return {
      invoiceNumber: `TAX-INV-${Date.now()}`,
      contractId,
      sellerName: 'Satcom Engineers Global Tech Ltd',
      sellerVatNumber: '310000000000003',
      buyerName,
      buyerVatNumber: buyerVat || 'N/A',
      issueDate: new Date().toISOString().split('T')[0],
      subtotalAmount: subtotal,
      platformFee,
      vatRatePercentage: 15,
      vatAmount,
      totalAmountWithVat: total,
      currency: 'USD',
      qrCodeData: qrData,
    };
  }
}