"use client";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.role;
  return (
    <div>
      <LottieHandler
        type={"pageNotFound"}
        colorMessage="text-gray-600"
        message="Page Not Found."
        Button={
          <Link href={role === "user" ? "/" : "/dashboard"}>
            <Button variant={"link"}>
              {" "}
              <Home className=" mr-2" /> Back To Home Page
            </Button>
          </Link>
        }
      />
    </div>
  );
}
