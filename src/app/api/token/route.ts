import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function GET() {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const payload = { issuedAt: Date.now() };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return NextResponse.json({ token });
}
