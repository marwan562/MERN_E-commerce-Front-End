"use client";

import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { Button } from "@/components/ui/button";
import { TStatusOrder } from "@/interface";
import { useGetOrderByIdQuery } from "@/toolkit/Apis/OrderApi";
import { useAuth } from "@clerk/nextjs";
import { GoalIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckoutPayment = () => {
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status") as TStatusOrder;
  const [token, setToken] = useState<string | null>(null);

  const { data, isLoading, error } = useGetOrderByIdQuery({ orderId, token });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken();
        setToken(fetchedToken);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };

    fetchToken();
  }, [getToken]);

  if (isLoading) {
    return <LottieHandler type="loadingCart" />;
  }

  if (error) {
    return (
      <LottieHandler
        type="paymentError"
        message="Error fetching order details"
        colorMessage=" text-red-900 "
      />
    );
  }

  return (
    <div>
      {data?._id && data?.status === status ? (
        <div className="flex flex-col items-center justify-center">
          <LottieHandler
            type="paymentSuccessfully"
            message="Payment Order Successfully"
            colorMessage=" text-green-900 "
            Button={
              <Link href={`/myOrders/${data._id}`} className=" space-x-2">
                <Button className="bg-green-700 ">
                  {" "}
                  <GoalIcon  /> Show You{"'"}r Order
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <LottieHandler
          type="paymentError"
          message="Payment Error or Canceled"
          colorMessage=" text-red-900 "
        />
      )}
    </div>
  );
};

export default CheckoutPayment;
