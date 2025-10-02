import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Calender from "./components/Calender";

export default function Home() {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/Login");

    try {
        jwt.verify(token, "your-secret-key");
    } catch {
        redirect("/Login");
    }

    return <Calender />;
}