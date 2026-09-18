import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
export class DisputeMessageDto { @IsNotEmpty() content: string; @IsArray() @IsOptional() fileUrls?: string[]; }