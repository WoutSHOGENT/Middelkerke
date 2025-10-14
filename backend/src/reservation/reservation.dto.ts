export class CreateReservationRequestDto {
	startDate: Date;
	endDate: Date;
	userId: number;
}

export class UpdateReservationRequestDto extends CreateReservationRequestDto {}

export class ReservationResponseDto extends CreateReservationRequestDto {
	id: number;
}

export class ReservationListResponseDto {
	items: ReservationResponseDto[];
}
