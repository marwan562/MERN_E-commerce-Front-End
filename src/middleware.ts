import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { User } from "./interface";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/auth-callback(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    const { getToken } = auth();
    const token = await getToken();

    if (token) {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/protected-endpoint/createUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            mode: "cors",
          }
        );

        if (!response.ok) {
          console.log(`HTTP error! Status: ${response.status}`);
          throw new Error("Failed to create user");
        }

        const data = await response.json();
        const user = data.user as User;
        console.log(user);

        const currentPathname = req.nextUrl.pathname;

        if (user.role === "admin") {
          if (currentPathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
          }
          if (!currentPathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
          }
        } else if (user.role === "user") {
          if (
            currentPathname === "/dashboard" ||
            currentPathname.startsWith("/dashboard")
          ) {
            return NextResponse.redirect(new URL("/", req.url));
          }
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch (error) {
        return NextResponse.next();
      }
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
