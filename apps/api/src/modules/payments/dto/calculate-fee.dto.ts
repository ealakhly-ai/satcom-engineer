import { IsNumber, Min } from 'class-validator';
export class CalculateFeeDto { @IsNumber() @Min(0) amount: number; }