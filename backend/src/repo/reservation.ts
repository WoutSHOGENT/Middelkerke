import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllReservations() {
    const reservations = await prisma.reservation.findMany({ include: { user: true } });
    return reservations;
}

export async function createReservation(date: string, userId:number){
    const reservation = await prisma.reservation.create({
        data: { date: new Date(date), userId }
    });
    return reservation;
}