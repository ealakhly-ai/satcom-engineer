export interface TaxInvoice {
  invoiceNumber: string;
  contractId: string;
  sellerName: string; // Satcom Engineers Ltd
  buyerName: string;
  buyerVatNumber?: string;
  issueDate: string;
  subtotalAmount: number;
  platformFee: number;
  vatRatePercentage: number; // e.g. 15%
  vatAmount: number;
  totalAmountWithVat: number;
  currency: string;
  qrCodeData: string; // Encoded ZATCA / Standard QR
}