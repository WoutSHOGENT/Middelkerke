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

	await db.delete(schema.users);

	console.log('Database reset completed\n');
}

async function seedUsers() {
	console.log('📍 Seeding places...');

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

async function main() {
	console.log('Starting database seeding...\n');

	await resetDatabase();
	await seedUsers();

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
