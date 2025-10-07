import { Injectable, NotFoundException } from '@nestjs/common';
import { users, User } from '../data/mockdata';
import {
	CreateUsersRequestDto,
	UpdateUserRequestDto,
	UserListResponseDto,
	UserResponseDto,
} from './user.dto';

@Injectable()
export class UserService {
	getAll(): UserListResponseDto {
		return { items: users };
	}

	getById(id: number): UserResponseDto {
		const user = users.find((item: User) => item.id === id);

		if (!user) {
			throw new NotFoundException('No User with this Id');
		}

		return user;
	}

	create({ name, email, password }: CreateUsersRequestDto): UserResponseDto {
		const newUser = {
			id: Math.max(...users.map((item: User) => item.id)) + 1,
			name,
			email,
			password,
		};
		users.push(newUser);
		return newUser;
	}

	update(
		id: number,
		{ name, email, password }: UpdateUserRequestDto,
	): UserResponseDto {
		let existingUser = this.getById(id);
		if (existingUser) {
			existingUser = { id: id, name, email, password };
		}
		return existingUser;
	}
}
