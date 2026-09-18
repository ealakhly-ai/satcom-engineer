import { IsNotEmpty } from 'class-validator';
export class RequestChangesDto { @IsNotEmpty() feedback: string; }