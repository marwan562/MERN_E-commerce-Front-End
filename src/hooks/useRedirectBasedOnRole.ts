"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { actCreateUser, logOut } from "@/toolkit/auth/authSlice";
import { cleanCartItemsAction } from "@/toolkit/Cart/cartSlice";
import { cleanWashlistAction } from "@/toolkit/Washlist/washlistSlice";

export const useRedirectBasedOnRole = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { isAuthanticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleAuthChange = async () => {
      if (isLoaded) {
        if (isSignedIn && !isAuthanticated) {
          const token = await getToken();
          dispatch(actCreateUser(token));
        } else if (!isSignedIn && isAuthanticated) {
          dispatch(logOut());
          dispatch(cleanCartItemsAction());
          dispatch(cleanWashlistAction());
        }

        if (isAuthanticated) {
          if (user?.role === "admin") {
            router.push("/dashboard");
          } else if (user?.role === "user") {
            router.push("/");
          }
        }
      }
    };

    handleAuthChange();
  }, [isSignedIn, isLoaded, isAuthanticated, dispatch, getToken, user, router]);
};
