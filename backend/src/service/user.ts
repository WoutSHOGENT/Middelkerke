import { Router } from "express";
import { getAllusers, createUser } from "../repo/users";

const router = Router();

router.get("/", async (_req, res) => {
    res.json(await getAllusers());
});

router.post("/", async (req, res) => {
    const { name, email } = req.body;
    const user = await createUser(name, email);
    res.status(201).json(user);
});

export default router;