"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { actGetCartItems } from "@/toolkit/Cart/act/actGetCartItems";
import { useAuth } from "@clerk/nextjs";
import { actAddCartItem } from "@/toolkit/Cart/act/addCartItem";
import { IProductsTypes } from "@/interface";
import { actDeleteItem } from "@/toolkit/Cart/act/actDeleteItem";
import { actUpdateItem } from "@/toolkit/Cart/act/actUpdateItem";

const NavCart = () => {
  const dispatch = useAppDispatch();
  const [animate, setAnimate] = useState(false);
  const { getToken } = useAuth();
  const { cartItems } = useAppSelector((state) => state.cart);

  const totalQuantity = cartItems?.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  );

  const totalPrice = cartItems.reduce((act, item) => {
    const total = (item?.quantity ?? 0) * item.productId.price;
    return act + total;
  }, 0);

  const incrementItemHandle = async (data: IProductsTypes) => {
    const token = await getToken();
    await dispatch(
      actAddCartItem({
        productId: data._id,
        token,
        quantity: data?.quantity,
      })
    );
  };
  const removeItemHanle = async (productId: number) => {
    const token = await getToken();
    await dispatch(actDeleteItem({ productId, token }));
  };
  const decrementItemHandle = async (productId: number) => {
    const token = await getToken();
    await dispatch(actUpdateItem({ productId, token }));
  };

  useEffect(() => {
    if (totalQuantity) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [totalQuantity]);

  useEffect(() => {
    const getAllItemsInCart = async () => {
      const token = await getToken();
      dispatch(actGetCartItems(token));
    };
    getAllItemsInCart();
  }, [dispatch, getToken]);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className={" font-bold text-[15px]"} variant="link">
          CART (
          <span className={animate ? " text-green-600  animate-ping " : ""}>
            {totalQuantity}
          </span>
          )
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
        <ScrollArea className="h-screen">
          <div className="mx-auto w-full p-5">
            <DrawerHeader>
              <DrawerTitle>Cart Menu</DrawerTitle>
              <DrawerDescription>
                You can show details you{"'"}r cart.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item, i) => {
                  return (
                    <div
                      key={item._id}
                      className=" flex flex-row gap-5 relative font-mono  p-1 group rounded-lg  border-2 border-gray-500"
                    >
                      <Button
                        size={"sm"}
                        onClick={() => removeItemHanle(item.productId._id)}
                        variant="destructive"
                        className="absolute end-2 top-2  transition hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                      <Image
                        className={" bg-gray-50  rounded-md"}
                        src={item?.productId?.img}
                        alt={`img-${i}`}
                        width={100}
                        height={100}
                      />
                      <div className=" ">
                        <h2 className="font-mono mb-2  text-lg group-hover:underline ">
                          <Link href={`/details-product/${item.productId._id}`}>
                            {item.productId.title}
                          </Link>
                        </h2>
                        <p>
                          Price:{" "}
                          <Badge variant="outline">
                            $ {item.productId.price}
                          </Badge>
                        </p>
                        <p>
                          Quantity:{" "}
                          <Badge variant="outline">{item.quantity}</Badge>
                        </p>
                        <div className="space-x-2  space-y-1">
                          <Button
                            onClick={() => incrementItemHandle(item.productId)}
                            size="sm"
                          >
                            +
                          </Button>
                          <Button
                            onClick={() =>
                              decrementItemHandle(item.productId._id)
                            }
                            variant="outline"
                            size="sm"
                          >
                            -
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>You don{"'"}t have any product</div>
              )}
              {cartItems.length > 0 ? (
                  <Link href={"/checkout-order"}>
                <Button className="w-full mt-2">
                    Order Now ${totalPrice.toFixed(2)}
                </Button>
                  </Link>
              ) : null}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default NavCart;
