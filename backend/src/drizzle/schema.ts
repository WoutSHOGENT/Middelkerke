import { uniqueIndex } from 'drizzle-orm/mysql-core';
import { varchar, mysqlTable, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
	'users',
	{
		id: int('id', { unsigned: true }).primaryKey().autoincrement(),
		name: varchar('name', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }).notNull(),
		password: varchar('password', { length: 255 }).notNull(),
	},
	(table) => [uniqueIndex('idx_user_email_unique').on(table.email)],
);
