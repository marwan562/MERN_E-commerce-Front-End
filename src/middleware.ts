import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher(["/protected-route(.*)"]);

// Clerk middleware configuration
export default clerkMiddleware((auth, req) => {
  // Apply authentication protection if the route matches
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

// Config for Next.js Middleware Matcher
export const config = {
  matcher: [
    // This matcher will exclude certain file types and directories
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Match API routes and TRPC routes
    "/(api|trpc)(.*)",
  ],
};
