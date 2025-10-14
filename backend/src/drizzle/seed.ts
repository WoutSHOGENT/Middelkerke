import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
	uri: process.env.DATABASE_URL,
	connectionLimit: 5,
});

const db = drizzle(connection, {
	schema,
	mode: 'default',
});

async function resetDatabase() {
	console.log('🗑️ Resetting database...');

	await db.delete(schema.reservations);
	await db.delete(schema.users);

	console.log('Database reset completed\n');
}

async function seedUsers() {
	console.log('Seeding users...');

	await db.insert(schema.users).values([
		{
			id: 1,
			name: 'Wout',
			email: 'wout@email.com',
			password: 'test',
		},
		{
			id: 2,
			name: 'test',
			email: 'test@email.com',
			password: 'test',
		},
	]);

	console.log('Users seeded successfully\n');
}

async function seedReservations() {
	await db.insert(schema.reservations).values([
		{
			id: 1,
			startDate: new Date('2025-10-12'),
			endDate: new Date('2025-10-14'),
			userId: 1,
		},
		{
			id: 2,
			startDate: new Date('2025-10-17'),
			endDate: new Date('2025-10-20'),
			userId: 2,
		},
	]);
}

async function main() {
	console.log('Starting database seeding...\n');

	await resetDatabase();
	await seedUsers();
	await seedReservations();

	console.log('🎉 Database seeding completed successfully!');
}

main()
	.then(async () => {
		await connection.end();
	})
	.catch(async (e) => {
		console.error(e);
		await connection.end();
		process.exit(1);
	});
