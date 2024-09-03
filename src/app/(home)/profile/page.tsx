"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import FormUserProfile from "@/components/Forms/FormUserProfile/FormUserProfile";
import {
  Image as ImageIcon,
  Loader,
  Loader2,
  Mails,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import FormChangeImageProfile from "@/components/Forms/FormChangeImageProfile/FormChangeImageProfile";
import { useAuthToken } from "@/hooks/useAuthToken";
import {
  actUpdateImageUser,
  actUpdateInforamtionUser,
} from "@/toolkit/auth/act/actUpdateUser";
import { toast } from "sonner";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/interface";

export default function Component() {
  const token = useAuthToken();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateInfor, setUpdateInfor] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const updateImageHanlder = async (body: FormData) => {
    try {
      setIsLoading(true);
      await dispatch(actUpdateImageUser({ token, body })).unwrap();
      toast.success("Update Image Successfully.");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Somethink went be wrong.");
    }
  };

  const updateInformationHanlder = async (body: Partial<User>) => {
    try {
      setUpdateInfor(true);
      await dispatch(actUpdateInforamtionUser({ token, body })).unwrap();
      toast.success("Update Information Successfully.");
      setUpdateInfor(false);
    } catch (err) {
      setUpdateInfor(false);
      toast.error("Somethink went be wrong.");
    }
  };
  if (!user) return <LottieHandler type="loadingCart" />;
  return (
    <Card className="container mx-auto px-4 p-3  mt-20 mb-6 md:px-6 ">
      <CardHeader>
        <CardTitle className=" text-3xl">Profile</CardTitle>
      </CardHeader>
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <Card className="bg-muted rounded-lg p-6 relative pt-7 flex flex-col shadow-lg items-center gap-4">
          <Dialog>
            <DialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full border  border-white absolute right-[92px] top-[123px] z-50"
                    >
                      {isLoading ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        <Plus />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="flex flex-row items-center">
                    <ImageIcon className=" mr-2 size-4" />
                    <p>Add New Image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Image Profile</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently change
                  your image profile and remove your last image from server.
                </DialogDescription>
              </DialogHeader>
              <FormChangeImageProfile
                titleSubmit="Save Changes"
                onSave={(value) => updateImageHanlder(value)}
                defaultValues={user.imageUrl}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
          {isLoading ? (
            <Skeleton className="size-24 rounded-full" />
          ) : (
            <Avatar className="size-24 z-40">
              <AvatarImage
                src={user.imageUrl}
                alt={`${user.firstName}-${user.lastName}`}
              />

              <AvatarFallback>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-muted-foreground">
              {user.phoneMobile
                ? `+20 (${user.phoneMobile
                    .toString()
                    .slice(0, 3)}) ${user.phoneMobile
                    .toString()
                    .slice(3, 6)}-${user.phoneMobile.toString().slice(6)}`
                : "N/A"}
            </p>
          </div>
          <Card className="p-4 mt-6 w-full  group cursor-pointer hover:shadow-lg duration-300 hover:scale-105">
            <Link
              href={"/myOrders"}
              className="flex flex-row items-center justify-between"
            >
              <div className=" font-mono  flex flex-row items-center justify-start gap-2">
                <ShoppingCart />
                <span className=" group-hover:underline ">Total Orders</span>
              </div>
              <Badge variant={"outline"}>20</Badge>
            </Link>
          </Card>
          <Card className="p-4 mt-2 w-full group cursor-pointer hover:shadow-lg duration-300 hover:scale-105">
            <Link
              href={"/mails"}
              className="flex flex-row items-center justify-between"
            >
              <div className=" font-mono  flex flex-row items-center justify-start gap-2">
                <Mails />
                <span className=" group-hover:underline ">Total Mails</span>
              </div>
              <Badge variant={"outline"}>20</Badge>
            </Link>
          </Card>
        </Card>
        <div className="grid gap-8">
          <Card className=" shadow-lg">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormUserProfile
                isLoading={isUpdateInfor}
                onSave={(body) => updateInformationHanlder(body)}
                defaultValues={user}
                user={user}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}
