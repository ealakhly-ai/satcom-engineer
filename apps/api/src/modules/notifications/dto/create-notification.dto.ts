import { IsNotEmpty } from 'class-validator';
export class CreateNotificationDto { @IsNotEmpty() userId: string; @IsNotEmpty() title: string; @IsNotEmpty() message: string; }