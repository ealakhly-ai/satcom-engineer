import { IsOptional } from 'class-validator';
export class UpdateClientProfileDto { @IsOptional() companyName?: string; @IsOptional() industry?: string; }