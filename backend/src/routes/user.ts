import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

//getAll
router.get("/", async (_req, res) => {
    const users = await prisma.user.findMany({ include: { reservations: true } });
    res.json(users);
});

// create new
router.post("/", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
});

export default router;