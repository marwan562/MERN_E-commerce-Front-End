import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { User } from "./interface";

// Define your protected routes
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/profile(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    try {
      const { getToken } = auth();
      const token = await getToken();
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

      const user = (await response.json()) as User;
      console.log("User response:", user);

      if (user.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else if (user.role === "user") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("Error in middleware:", error);
      return NextResponse.redirect(new URL("/internet", req.url));
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
