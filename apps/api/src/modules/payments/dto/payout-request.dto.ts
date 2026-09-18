import { IsNumber, Min, IsNotEmpty } from 'class-validator';
export class PayoutRequestDto { @IsNumber() @Min(50) amount: number; @IsNotEmpty() paymentMethod: string; }