import { Router } from "express";
import { createReservation, getAllReservations } from "../repo/reservation";


const router = Router();

router.get("/", async (_req, res) => {
    const reservations = await getAllReservations();
    res.json(reservations);
});

router.post("/", async (req, res) => {
    const { date, userId } = req.body;
    const datep = JSON.parse(date);
    const reservation = await createReservation(datep, userId);
    res.status(201).json(reservation);
});

export default router;