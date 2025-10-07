export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
}

export interface Reservation {
	id: number;
	userId: number;
	startDate: Date;
	endDate: Date;
}

export const users: User[] = [
	{
		id: 1,
		name: 'Wout',
		email: 'wout@example.com',
		password: 'password',
	},
	{
		id: 2,
		name: 'Jan',
		email: 'jan@example.com',
		password: 'password',
	},
];

export const reservations: Reservation[] = [
	{
		id: 1,
		userId: 1,
		startDate: new Date('2025-10-9'),
		endDate: new Date('2025-10-12'),
	},
	{
		id: 2,
		userId: 2,
		startDate: new Date('2025-10-25'),
		endDate: new Date('2025-10-30'),
	},
];
