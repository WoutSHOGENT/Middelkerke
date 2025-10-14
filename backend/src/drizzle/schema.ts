import { relations } from 'drizzle-orm';
import { uniqueIndex } from 'drizzle-orm/mysql-core';
import { varchar, mysqlTable, int, date } from 'drizzle-orm/mysql-core';

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

export const reservations = mysqlTable('reservations', {
	id: int('id', { unsigned: true }).primaryKey().autoincrement(),
	startDate: date('startDate').notNull(),
	endDate: date('endDate').notNull(),
	userId: int('user_id', { unsigned: true })
		.references(() => users.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});

export const usersRelations = relations(reservations, ({ many }) => ({
	users: many(reservations),
}));
