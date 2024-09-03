"use client";

import React, { useCallback, useState } from "react";
import { Menu, Bell, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useAdminContext } from "../context/useAdminContext";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { logOut } from "@/toolkit/auth/authSlice";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { toggleSidebar, isSidebarOpen } = useAdminContext();
  const { signOut } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await signOut({ redirectUrl: "/" });
      dispatch(logOut());
      toast.success("Log out Successfully.");
      router.push("/");
    } catch (error) {
      console.error("Failed to log out", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, router, signOut]);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
           <Sidebar/>
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-4">
          <form className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full md:w-[300px] pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
          <Button variant="ghost" size="icon" className="relative group">
            <Bell className="h-5 w-5 group-hover:rotate-45 duration-300 " />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {loading || status === "pending" ? (
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
      </div>
    </header>
  );
}
