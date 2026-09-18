export enum KYCDocumentType {
  PASSPORT = 'PASSPORT',
  NATIONAL_ID = 'NATIONAL_ID',
  DRIVING_LICENSE = 'DRIVING_LICENSE'
}

export enum KYCStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export interface KYCVerificationRecord {
  id: string;
  userId: string;
  documentType: KYCDocumentType;
  documentNumber: string;
  documentFrontUrl: string;
  documentBackUrl?: string;
  selfieUrl: string;
  status: KYCStatus;
  adminRejectionReason?: string;
  verifiedAt?: Date | string;
  createdAt: Date | string;
}