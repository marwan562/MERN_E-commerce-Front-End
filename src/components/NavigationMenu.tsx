"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const NavNavigationMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" underline bg-inherit hover:bg-inherit  ">
            About App
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3  relative p-4 w-[400px] lg:w-[500px] grid-cols-[.75fr_1fr]">
              <Image
                className=" absolute top-5 left-5 w-[92px] cursor-pointer h-[18px] object-cover"
                src="/svg/corsen-main-logo-svg.svg"
                alt="logo"
                height={0}
                width={0}
              />
              <Image
                className=" object-cover rounded-md h-full"
                src="https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426312/cfe8pbd812uwsdyuf9uf.png"
                alt="navgation-img"
                width={200}
                height={200}
              />
                <ScrollArea className="h-48 md:h-full ">
              <li className=" flex flex-col  gap-3">
                  <ListItem
                    className=" md:hidden hover:underline border hover:bg-gray-100   duration-300"
                    href="/"
                    title="Home"
                  >
                    E-commerce, Home Page
                  </ListItem>
                  <ListItem
                    className="hover:underline border hover:bg-gray-100   duration-300"
                    href="/categories"
                    title="Categories"
                  >
                    Show New Categories.
                  </ListItem>
                  <ListItem
                    className="hover:underline border  hover:bg-gray-100 duration-200"
                    href="/products"
                    title="Products"
                  >
                    We have the best clothing materials and products.
                  </ListItem>
                  <ListItem
                    className="hover:underline border  hover:bg-gray-100  duration-200"
                    href="/blog"
                    title="Bolg"
                  >
                    You should watch the latest international blogs...etc
                  </ListItem>
              </li>
                </ScrollArea>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavNavigationMenu;
