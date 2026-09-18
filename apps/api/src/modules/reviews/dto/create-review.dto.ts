import { IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
export class CreateReviewDto { @IsNumber() @Min(1) @Max(5) rating: number; @IsNotEmpty() feedback: string; }