import { auth } from "@/actions/auth";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");

  if (isAuthRoute) {
    const isLoggedIn = await auth();
    if (isLoggedIn) {
      if (pathname !== "/auth/logout") {
        return Response.redirect(new URL("/auth/logout", origin));
      }
      return;
    }

    if (pathname !== "/auth/login") {
      return Response.redirect(new URL("/auth/login", origin));
    }

    return;
  }

  return;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
