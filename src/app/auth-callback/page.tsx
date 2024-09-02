"use client";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {

  return (
    <LottieHandler
      type="loadingCart"
      colorMessage="text-gray-500"
      message={
        <div className="flex flex-row items-center justify-center">
          <Loader2 className="animate-spin size-7 mr-2" />
          <span>Checking User...</span>
        </div>
      }
    />
  );
};

export default AuthCallback;
