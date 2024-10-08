"use client";
import { ReactNode } from "react";
import Lottie from "lottie-react";
import loadingCart from "./loading.json";
import paymentError from "./paymentError.json";
import cartEmpty from "./cartEmpty.json";
import pageNotFound from "./pageNotFound.json";
import trackingTruck from "./trackingTruck.json";
import internetOffline from "./internetOffline.json";
import emailSuccess from "./emailSuccess.json";
import MailBoxEmpty from "./MailBoxEmpty.json";
import paymentSuccessfully from "./paymentSuccessfully.json";

const lottieTypes = {
  loadingCart,
  paymentError,
  paymentSuccessfully,
  cartEmpty,
  trackingTruck,
  internetOffline,
  pageNotFound,
  emailSuccess,
  MailBoxEmpty
};

type TProps = {
  type: keyof typeof lottieTypes;
  message?: string | ReactNode;
  className?: string;
  size?: string;
  colorMessage?: string;
  Button?: ReactNode;
};

const LottieHandler = ({
  type,
  colorMessage,
  Button,
  message,
  size = " w-[400px]",
  className = "flex items-center justify-center h-screen",
}: TProps) => {
  const lottie = lottieTypes[type];
  return (
    <div className={className}>
      <div
        className={`${size}  flex flex-col items-center justify-center space-y-2`}
      >
        <Lottie size={500} animationData={lottie} />
        {Button}
        {message && (
          <h2 className={` text-center text-3xl ${colorMessage}`}>
            {" "}
            {message}
          </h2>
        )}
      </div>
    </div>
  );
};

export default LottieHandler;
