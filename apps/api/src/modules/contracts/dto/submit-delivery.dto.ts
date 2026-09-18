import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
export class SubmitDeliveryDto { @IsNotEmpty() notes: string; @IsArray() @IsOptional() fileUrls?: string[]; }