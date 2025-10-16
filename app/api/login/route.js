// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "12345") {
    return NextResponse.json({
      message: "Login berhasil",
      role: "admin",
      username,
    });
  }

  return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
}
