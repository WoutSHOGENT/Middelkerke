import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
	CreateReservationRequestDto,
	ReservationListResponseDto,
	ReservationResponseDto,
	UpdateReservationRequestDto,
} from './reservation.dto';

@Controller('reservation')
export class ReservationController {
	constructor(private readonly reservationService: ReservationService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllReservations(): Promise<ReservationListResponseDto> {
		return this.reservationService.getAll();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	getReservationById(@Param('id') id: string): Promise<ReservationResponseDto> {
		return this.reservationService.getById(Number(id));
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	createReservation(
		@Body() createReservationDto: CreateReservationRequestDto,
	): Promise<ReservationResponseDto> {
		return this.reservationService.create(createReservationDto);
	}

	@Put(':id')
	@HttpCode(HttpStatus.CREATED)
	updateReservation(
		@Param('id') id: string,
		@Body() updateReservationDto: UpdateReservationRequestDto,
	): Promise<ReservationResponseDto> {
		return this.reservationService.update(Number(id), updateReservationDto);
	}
}
