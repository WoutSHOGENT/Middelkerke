import mockdata from "./mockdata.json";
import jwt from "jsonwebtoken";

const SECRET = "your-secret-key"; // Use a strong secret in production

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    const user = mockdata.users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "10h" });

    res.status(200).json({ token });
}