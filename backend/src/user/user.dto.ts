export class CreateUsersRequestDto {
	name: string;
	email: string;
	password: string;
}

export class UpdateUserRequestDto {
	name: string;
	email: string;
	password: string;
}

export class UserResponseDto extends CreateUsersRequestDto {
	id: number;
}

export class UserListResponseDto {
	items: UserResponseDto[];
}
