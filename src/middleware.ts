import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verify(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/api") && pathname !== "/api/token") {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const payload = await verify(token);
        if (!payload) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    // Match all API routes except for /api/token
    matcher: ["/api/((?!token).*)"],
};
