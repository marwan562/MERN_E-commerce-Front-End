"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { actCreateUser, logOut } from "@/toolkit/auth/authSlice";
import { cleanCartItemsAction } from "@/toolkit/Cart/cartSlice";
import { cleanWashlistAction } from "@/toolkit/Washlist/washlistSlice";

const RedirectRoleProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { isAuthanticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleAuthChange = async () => {
      if (!isLoaded) return;

      if (isSignedIn && !isAuthanticated) {
        const token = await getToken();
        dispatch(actCreateUser(token));
      } else if (!isSignedIn && isAuthanticated) {
        dispatch(logOut());
        dispatch(cleanCartItemsAction());
        dispatch(cleanWashlistAction());
        router.push("/auth-callback");
        return;
      }

      if (isAuthanticated) {
        if (user?.role === "admin") {
          if (pathname === "/") {
            const lastVisitedPage = sessionStorage.getItem("lastVisitedPage");
            if (lastVisitedPage) {
              router.push(lastVisitedPage);
            } else {
              router.push("/dashboard");
            }
          }
        } else if (user?.role === "user") {
          if (pathname === "/dashboard") {
            router.push("/");
          }
        } else {
          console.error("Unknown user role:", user?.role);
          router.push("/internet");
        }
      } else {
        if (user?.role === "admin") {
          router.push("/dashboard");
        }
      }
    };

    handleAuthChange();
  }, [
    isSignedIn,
    isLoaded,
    isAuthanticated,
    dispatch,
    getToken,
    user,
    router,
    pathname,
  ]);

  useEffect(() => {
    if (user?.role === "admin" && pathname !== "/dashboard") {
      sessionStorage.setItem("lastVisitedPage", pathname);
    }
  }, [pathname, user]);

  return <>{children}</>;
};

export default RedirectRoleProvider;
