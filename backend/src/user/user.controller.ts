import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Put,
} from '@nestjs/common';
import {
	CreateUsersRequestDto,
	UpdateUserRequestDto,
	UserListResponseDto,
	UserResponseDto,
} from './user.dto';
import { UserService } from './user.service';

export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
}

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	getAllUsers(): UserListResponseDto {
		return this.userService.getAll();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	getUserById(@Param('id') id: string): UserResponseDto {
		return this.userService.getById(Number(id));
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	createUser(@Body() createUserDto: CreateUsersRequestDto): UserResponseDto {
		return this.userService.create(createUserDto);
	}

	@Put(':id')
	@HttpCode(HttpStatus.CREATED)
	updateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserRequestDto,
	): UserResponseDto {
		return this.userService.update(Number(id), updateUserDto);
	}
}
