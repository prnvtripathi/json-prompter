import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const cookieStore = await cookies();

  const payload = { issuedAt: Date.now() };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  cookieStore.set("token", token, { httpOnly: true });

  return NextResponse.json({ message: "Token set successfully" });
}
