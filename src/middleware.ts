import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { User } from "./interface";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/auth-callback(.*)"
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    const { getToken } = auth();
    const token = await getToken();

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/protected-endpoint/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to create user. Status: ${response.status}`);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const user = data.user as User;

      const currentPathname = req.nextUrl.pathname;

      if (user.role === "admin") {
        if (currentPathname === "/") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        if (!currentPathname.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } else if (user.role === "user") {
        if (currentPathname.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    } catch (error) {
      console.error("Error in protected route middleware:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
