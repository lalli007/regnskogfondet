import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username === process.env.SITE_USERNAME &&
    password === process.env.SITE_PASSWORD
  ) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("rf_auth", process.env.AUTH_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dager
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
