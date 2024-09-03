"use client";

import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";

const InternetErrors = () => {
  const { back, push } = useRouter();
  const { network } = useAppSelector((state) => state.network);

  if (!network)
    return (
      <LottieHandler
        type="internetOffline"
        colorMessage=" text-[18px]  text-gray-600"
        Button={
          <Button className="mt-3" onClick={() => back()}>
            Refresh
          </Button>
        }
        message="Check Your Internet Connection."
      />
    );

  return (
    <LottieHandler
      type="internetOffline"
      colorMessage=" text-[18px] text-gray-600"
      Button={<Button onClick={() => push("/")}>Home</Button>}
      message="Sever error please back to Home."
    />
  );
};

export default InternetErrors;
