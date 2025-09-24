import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllusers() {
    const users = await prisma.user.findMany({ include: { reservations: true } });
    return users;
}

export async function createUser(name: string, email: string) {
    const user = await prisma.user.create({ data: { name, email } });
    return user;
}