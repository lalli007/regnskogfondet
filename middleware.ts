import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // La innloggingssiden og API-ruten passere
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }

  // Sjekk auth-cookie
  const auth = req.cookies.get("rf_auth")?.value;
  if (auth === process.env.AUTH_SECRET) {
    return NextResponse.next();
  }

  // Send til innloggingssiden
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|video).*)"],
};
