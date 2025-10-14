import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
	imports: [DrizzleModule],
	controllers: [ReservationController],
	providers: [ReservationService],
	exports: [ReservationService],
})
export class ReservationModule {}
