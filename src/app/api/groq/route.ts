import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, model, temperature } = body;
  console.log("Received GROQ request:", body);

  // Here you would handle the GROQ request and return a response
  return NextResponse.json({ message: "GROQ request received" });
}
