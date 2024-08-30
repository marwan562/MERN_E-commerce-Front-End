"use client";

import { SignInButton, useAuth, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { LogInIcon, LogOut, Settings, ShoppingCart, User } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logOut } from "@/toolkit/auth/authSlice";
import Link from "next/link";

const LogInUser = () => {
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAuth();
  const { user, status } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
    dispatch(logOut());
  };

  return (
    <>
      {isSignedIn ? (
        <div className="flex flex-col items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {status === "pending" ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={`${user?.firstName} ${user?.lastName}`}
                    />
                    <AvatarFallback>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <Link href="/myOrders" className=" cursor-pointer">
                <DropdownMenuItem>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <SignInButton mode="modal" fallbackRedirectUrl={"/auth-callback"}>
          <Button className="flex group items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-full shadow-md px-2 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <LogInIcon className=" size-[18px] mr-2 group-hover:animate-bounce" />
            <span> Log In</span>
          </Button>
        </SignInButton>
      )}
    </>
  );
};

export default LogInUser;
