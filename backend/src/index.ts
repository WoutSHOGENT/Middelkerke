import express from "express";
import userRoutes from "./routes/user";
import reservationRoutes from "./routes/reservation";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/", (_req, res) => {
    res.send("Middelkerke API is running!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});