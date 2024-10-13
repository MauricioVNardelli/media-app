import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./lib/actions";

export async function middleware(request: NextRequest) {
  const user = await getUser();
  const isAuthenticated = user !== undefined;

  if (!isAuthenticated)
    return NextResponse.redirect(new URL("/auth", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/system/:path*",
};
