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

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllUsers(): Promise<UserListResponseDto> {
		return this.userService.getAll();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	getUserById(@Param('id') id: string): Promise<UserResponseDto> {
		return this.userService.getById(Number(id));
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	createUser(
		@Body() createUserDto: CreateUsersRequestDto,
	): Promise<UserResponseDto> {
		return this.userService.create(createUserDto);
	}

	@Put(':id')
	@HttpCode(HttpStatus.CREATED)
	updateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserRequestDto,
	): Promise<UserResponseDto> {
		return this.userService.update(Number(id), updateUserDto);
	}
}
