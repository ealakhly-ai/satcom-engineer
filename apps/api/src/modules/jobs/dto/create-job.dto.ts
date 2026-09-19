import { IsNotEmpty, IsNumber, Min, IsArray, IsOptional, IsEnum } from 'class-validator';
import { JobType } from '@prisma/client';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(50)
  budget: number;

  @IsEnum(JobType)
  @IsOptional()
  jobType?: JobType;

  @IsNotEmpty()
  estimatedDuration: string;

  @IsArray()
  @IsOptional()
  skillNames?: string[];
}