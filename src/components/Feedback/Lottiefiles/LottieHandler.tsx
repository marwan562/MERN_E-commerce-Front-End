import { ReactNode } from "react";
import Lottie from "lottie-react";
import loadingCart from "./loading.json";
import paymentError from "./paymentError.json";
import cartEmpty from "./cartEmpty.json";
import paymentSuccessfully from "./paymentSuccessfully.json";

const lottieTypes = {
  loadingCart,
  paymentError,
  paymentSuccessfully,
  cartEmpty
};

type TProps = {
  type: keyof typeof lottieTypes;
  message?: string;
  className?: string;
  size?: string;
  colorMessage?:string;
  Button?:ReactNode
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
      <div className={`${size}  flex flex-col items-center justify-center space-y-2`}>
        <Lottie animationData={lottie} />
       {Button}
        {message && <h2 className={` text-center text-3xl ${colorMessage}`}> {message}</h2>}
      </div>
    </div>
  );
};

export default LottieHandler;
