import { Module } from '@nestjs/common';
import { HourlyService } from './hourly.service';
import { HourlyController } from './hourly.controller';

@Module({ controllers: [HourlyController], providers: [HourlyService], exports: [HourlyService] })
export class HourlyModule {}