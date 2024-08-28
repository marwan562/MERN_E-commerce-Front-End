"use client";

import { SignInButton, SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

import { useAppSelector } from "@/lib/store";
import { LogInIcon } from "lucide-react";

const LogInUser = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { status } = useAppSelector((state) => state.auth);

  if (!isLoaded || status === "pending") {
    return (
      <div className="bg-gray-200 size-10 rounded-full animate-pulse"></div>
    );
  }

  return (
    <>
      {isSignedIn ? (
        <div className="flex flex-col items-center">
          <SignedIn >
            <UserButton />
          </SignedIn>
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button className="flex group items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-full shadow-md px-2 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <LogInIcon className=" size-[18px] mr-2 group-hover:animate-bounce"/>
            <span> Log In</span>
          </Button>
        </SignInButton>
      )}
    </>
  );
};

export default LogInUser;
