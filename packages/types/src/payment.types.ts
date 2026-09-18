export const PLATFORM_FEE_STEP_USD = 300.0;
export const PLATFORM_FEE_PER_STEP_USD = 20.0;
export const PLATFORM_FIXED_FEE_USD = 20.0; // Base fee for up to $300

/**
 * Calculates platform commission: $20 for every $300 (or fraction thereof)
 * Example:
 * - $1 to $300   => $20
 * - $301 to $600 => $40
 * - $601 to $900 => $60
 * - $901 to $1200 => $80
 */
export function calculatePlatformFee(amount: number): number {
  if (!amount || amount <= 0) return 0;
  const tiers = Math.max(1, Math.ceil(amount / PLATFORM_FEE_STEP_USD));
  return tiers * PLATFORM_FEE_PER_STEP_USD;
}

export enum PaymentGateway {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  WISE = 'WISE'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  HELD_IN_ESCROW = 'HELD_IN_ESCROW',
  RELEASED = 'RELEASED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

export enum PayoutMethod {
  STRIPE_CONNECT = 'STRIPE_CONNECT',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PayoutStatus {
  REQUESTED = 'REQUESTED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export interface PaymentTransaction {
  id: string;
  contractId: string;
  clientId: string;
  freelancerId: string;
  gateway: PaymentGateway;
  gatewayTransactionId?: string;
  grossAmount: number;             // المبلغ الإجمالي المدفوع للضمان
  platformFee: number;             // رسم المنصة (20$ لكل 300$)
  freelancerNetAmount: number;     // صافي المستقل
  status: PaymentStatus;
  transactionRef: string;
  createdAt: Date | string;
  releasedAt?: Date | string;
}

export interface CreatePaymentIntentInput {
  contractId: string;
  milestoneId?: string;
  amount: number;
  gateway: PaymentGateway;
  currency?: string;
}

export interface PaymentIntentResponse {
  clientSecret?: string; // Stripe client_secret
  orderId?: string;      // PayPal order ID
  approvalUrl?: string;  // PayPal approval link
  grossAmount: number;
  platformFee: number;
  currency: string;
}

export interface PayoutRequestInput {
  freelancerId: string;
  amount: number;
  method: PayoutMethod;
  destinationAccount: string; // IBAN, PayPal Email, etc.
}

export function calculateContractFinances(
  agreedAmount: number,
  feePayer: 'CLIENT' | 'FREELANCER' | 'SPLIT' = 'CLIENT'
) {
  const platformFee = calculatePlatformFee(agreedAmount);
  let clientTotal = agreedAmount;
  let freelancerNet = agreedAmount;

  if (feePayer === 'CLIENT') {
    clientTotal = agreedAmount + platformFee;
    freelancerNet = agreedAmount;
  } else if (feePayer === 'FREELANCER') {
    clientTotal = agreedAmount;
    freelancerNet = Math.max(0, agreedAmount - platformFee);
  } else {
    clientTotal = agreedAmount + (platformFee / 2);
    freelancerNet = Math.max(0, agreedAmount - (platformFee / 2));
  }

  return {
    jobAgreedAmount: agreedAmount,
    platformFee,
    clientTotalPayable: clientTotal,
    freelancerNetReceivable: freelancerNet,
    platformRevenue: platformFee,
  };
}