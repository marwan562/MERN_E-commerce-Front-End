import React from "react";
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAppSelector } from "@/lib/store";
import Link from "next/link";
import { toast } from "sonner";

const PaymentTab = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <TabsContent value="card">
      <Card>
        <CardHeader className="">
          <CardTitle>Card</CardTitle>
          <CardDescription>
            Users enter their card number, name, expiration date, and CVC.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 pt-2 bg-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
            <div className=" space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="First Last" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="number">Card Number</Label>
            <Input id="number" placeholder="" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="month">Expires</Label>
              <Select>
                <SelectTrigger id="month" aria-label="Month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>
                      {new Date(Date.UTC(0, i)).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year" aria-label="Year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={`${new Date().getFullYear() + i}`}
                    >
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" />
            </div>
          </div>
        </CardContent>

        {cartItems.length > 0 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <CardFooter>
                <Button className="w-full ">Payment Order</Button>
              </CardFooter>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Link href={"/categories"}>
            <Button onClick={() => toast.error("Cart Items Empty!")} className="w-full ">
              Cart Empty, Go To Shopping{" "}
            </Button>
          </Link>
        )}
      </Card>
    </TabsContent>
  );
};

export default PaymentTab;
