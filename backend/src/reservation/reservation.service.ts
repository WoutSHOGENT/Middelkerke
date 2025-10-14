import { Injectable, NotFoundException } from '@nestjs/common';
import {
	InjectDrizzle,
	type DatabaseProvider,
} from '../drizzle/drizzle.provider';
import {
	CreateReservationRequestDto,
	ReservationListResponseDto,
	ReservationResponseDto,
	UpdateReservationRequestDto,
} from './reservation.dto';
import { reservations } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReservationService {
	constructor(
		@InjectDrizzle()
		private readonly db: DatabaseProvider,
	) {}

	async getAll(): Promise<ReservationListResponseDto> {
		const items = await this.db.query.reservations.findMany();
		return { items };
	}

	async getById(id: number): Promise<ReservationResponseDto> {
		const reservation = await this.db.query.reservations.findFirst({
			where: eq(reservations.id, id),
		});

		if (!reservation) {
			throw new NotFoundException('No Reservation with this Id');
		}

		return reservation;
	}

	async create({
		startDate,
		endDate,
		userId,
	}: CreateReservationRequestDto): Promise<ReservationResponseDto> {
		const newReservation = {
			startDate,
			endDate,
			userId,
		};
		const [reservation] = await this.db
			.insert(reservations)
			.values(newReservation)
			.$returningId();

		return this.getById(reservation.id);
	}

	async update(
		id: number,
		{ startDate, endDate, userId }: UpdateReservationRequestDto,
	): Promise<ReservationResponseDto> {
		const changes: Partial<typeof reservations.$inferInsert> = {};

		if (startDate !== undefined) changes.startDate = startDate;
		if (endDate !== undefined) changes.endDate = endDate;
		if (userId !== undefined) changes.userId = userId;

		await this.db
			.update(reservations)
			.set(changes)
			.where(eq(reservations.id, id));

		const existingReservation = this.getById(id);
		return existingReservation;
	}
}
