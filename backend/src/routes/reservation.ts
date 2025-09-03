import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (_req, res) => {
    const reservations = await prisma.reservation.findMany({ include: { user: true } });
    res.json(reservations);
});

router.post("/", async (req, res) => {
    const { date, userId } = req.body;
    const reservation = await prisma.reservation.create({
        data: { date: new Date(date), userId }
    });
    res.status(201).json(reservation);
});

export default router;