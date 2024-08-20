"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
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
import {
  removeProductAction,
  setCartAction,
  decrementItemAction,
} from "@/toolkit/Cart/cartSlice";
import { actGetCartItems } from "@/toolkit/Cart/act/actGetCartItems";

const NavCart = () => {
  const dispatch = useAppDispatch();
  // const [animate, setAnimate] = useState(false);
  const { cartItems, status } = useAppSelector((state) => state.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  );

  const totalPrice = cartItems.reduce((act, item) => {
    const total = (item?.quantity ?? 0) * item.price;
    return act + total;
  }, 0);

  // const incrementItemHandle = (item: Item) => {
  //   dispatch(setCartAction(item));
  //   toast.success("Increment Item To Cart Successfully");
  // };
  // const removeItemHanle = (id: number) => {
  //   dispatch(removeProductAction(id));
  //   toast.success("Rmove Item From Cart Successfully");
  // };
  // const decrementItemHandle = (id: number) => {
  //   dispatch(decrementItemAction(id));
  //   toast.success("Decrement Item To Cart Successfully");
  // };

  // useEffect(() => {
  //   if (totalQuantity) {
  //     setAnimate(true);
  //     const timer = setTimeout(() => setAnimate(false), 500);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [totalQuantity]);

  useEffect(() => {
    dispatch(actGetCartItems());
  }, [dispatch]);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className={" font-bold text-[15px]"} variant="link">
          CART (
          {/* <span className={animate ? " text-green-600  animate-ping " : ""}> */}
          {totalQuantity}
          {/* </span> */})
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
                        // onClick={() => removeItemHanle(item._id)}
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
                        src={item.img}
                        alt={`img-${i}`}
                        width={100}
                        height={100}
                      />
                      <div className=" ">
                        <h2 className="font-mono mb-2  text-lg group-hover:underline ">
                          <Link href={`/details-product/${item._id}`}>
                            {item.title}
                          </Link>
                        </h2>
                        <p>
                          Price: <Badge variant="outline">$ {item.price}</Badge>
                        </p>
                        <p>
                          Quantity:{" "}
                          <Badge variant="outline">{item.quantity}</Badge>
                        </p>
                        <div className="space-x-2  space-y-1">
                          <Button
                            // onClick={() => incrementItemHandle(item)}
                            size="sm"
                          >
                            +
                          </Button>
                          <Button
                            // onClick={() => decrementItemHandle(item.id)}
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
                <Button className="w-full">
                  Checkout ${totalPrice.toFixed(2)}
                </Button>
              ) : null}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default NavCart;
