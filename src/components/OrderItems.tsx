import { IProductsTypes } from "@/interface";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/lib/store";
import { useAuth } from "@clerk/nextjs";
import { actDeleteItem } from "@/toolkit/Cart/act/actDeleteItem";



const OrderItems = ({ _id, img, title, price, quantity }: IProductsTypes) => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const [isRemove, setIsRemove] = useState(false);
  const handleRmoveItem = async (productId: number) => {
    setIsRemove(true);
    const token = await getToken();

    await dispatch(actDeleteItem({ token, productId }))
      .unwrap()
      .then(() => setIsRemove(false));
  };
  return (
    <div className="flex border-b pb-4 mb-4 relative group duration-300 ">
      <Image
        width={200}
        height={200}
        src={img}
        alt={title}
        className="w-24 h-24 object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-mono  group-hover:underline duration-300  cursor-pointer">
          {title}
        </h3>
        <p className="text-gray-600">${price}</p>
        <p className="text-gray-500">Quantity: {quantity}</p>
      </div>
      <Button
        onClick={() => handleRmoveItem(_id)}
        size={"sm"}
        variant={"destructive"}
        className=" absolute right-0 cursor-pointer"
      >
        {isRemove ? (
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          "X"
        )}
      </Button>
      
    </div>
  );
};

export default OrderItems;
