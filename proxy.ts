import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/recipes") {
    return NextResponse.redirect(new URL("/recipes/1", request.url));
  }
}

export const config = {
  matcher: "/recipes",
};