import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/Login", "/api/login"];

export function middleware(request) {
    const { pathname } = request.nextUrl;
    if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

    const token = request.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/Login", request.url));
    }

    try {
        jwt.verify(token, "your-secret-key");
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/Login", request.url));
    }
}