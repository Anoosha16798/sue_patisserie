import { NextResponse } from "next/server";
import type { ContactInquiry } from "@/types/menu";

function isFrosting(value: unknown): value is ContactInquiry["frosting"] {
  return value === "whipped" || value === "buttercream" || value === "not-sure";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const phone = typeof record.phone === "string" ? record.phone.trim() : "";
  const occasion = typeof record.occasion === "string" ? record.occasion.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";
  const frosting = record.frosting;

  if (name.length < 2) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Please add a valid email." }, { status: 400 });
  }
  if (phone.length < 8) {
    return NextResponse.json({ error: "Please add a reachable phone number." }, { status: 400 });
  }
  if (message.length < 8) {
    return NextResponse.json({ error: "Tell us a little more about the order." }, { status: 400 });
  }
  if (!isFrosting(frosting)) {
    return NextResponse.json({ error: "Choose a frosting preference." }, { status: 400 });
  }

  const inquiry: ContactInquiry = {
    name,
    email,
    phone,
    occasion,
    frosting,
    message,
  };

  console.info("Sue Patisserie inquiry", inquiry);

  return NextResponse.json({ ok: true });
}
