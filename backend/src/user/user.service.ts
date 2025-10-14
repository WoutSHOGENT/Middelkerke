import { Injectable, NotFoundException } from '@nestjs/common';
import {
	CreateUsersRequestDto,
	UpdateUserRequestDto,
	UserListResponseDto,
	UserResponseDto,
} from './user.dto';
import {
	InjectDrizzle,
	type DatabaseProvider,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';

@Injectable()
export class UserService {
	constructor(
		@InjectDrizzle()
		private readonly db: DatabaseProvider,
	) {}

	async getAll(): Promise<UserListResponseDto> {
		const items = await this.db.query.users.findMany();
		return { items };
	}

	async getById(id: number): Promise<UserResponseDto> {
		const user = await this.db.query.users.findFirst({
			where: eq(users.id, id),
		});

		if (!user) {
			throw new NotFoundException('No User with this Id');
		}

		return user;
	}

	async create({
		name,
		email,
		password,
	}: CreateUsersRequestDto): Promise<UserResponseDto> {
		const newUser = {
			name,
			email,
			password,
		};
		const [user] = await this.db.insert(users).values(newUser).$returningId();
		return this.getById(user.id);
	}

	async update(
		id: number,
		{ name, email, password }: UpdateUserRequestDto,
	): Promise<UserResponseDto> {
		const changes: Partial<typeof users.$inferInsert> = {};

		if (name !== undefined) changes.name = name;
		if (email !== undefined) changes.email = email;
		if (password !== undefined) changes.password = password;

		await this.db.update(users).set(changes).where(eq(users.id, id));
		const existingUser = this.getById(id);
		return existingUser;
	}
}
