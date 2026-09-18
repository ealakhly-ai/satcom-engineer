import { IsNotEmpty, IsNumber } from 'class-validator';
export class AddCertificationDto { @IsNotEmpty() title: string; @IsNotEmpty() issuer: string; @IsNumber() issueYear: number; }