import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateDisputeDto { @IsNotEmpty() reason: string; @IsOptional() milestoneId?: string; }