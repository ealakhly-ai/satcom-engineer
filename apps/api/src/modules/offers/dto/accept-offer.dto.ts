import { IsNotEmpty } from 'class-validator';
export class AcceptOfferDto { @IsNotEmpty() offerId: string; }