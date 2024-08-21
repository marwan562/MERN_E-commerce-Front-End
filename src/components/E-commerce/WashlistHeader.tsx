"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store";
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
import { actGetWashlist } from "@/toolkit/Washlist/act/actGetWashlist";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ProductList from "../ProductsList";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const WashlistHeader = () => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const [animate, setAnimate] = useState(false);
  const { washlist } = useAppSelector((state) => state.washlist);

  const totalWashlist = washlist.length;

  useEffect(() => {
    const getAllWashlist = async () => {
      const token = await getToken();
      await dispatch(actGetWashlist(token));
    };
    getAllWashlist();
  }, [dispatch, getToken]);

  useEffect(() => {
    if (totalWashlist) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [totalWashlist]);

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex items-center space-x-1 hover:underline tracking-wide font-bold text-[15px] cursor-pointer">
          <Image
            src="/svg/washlist.svg"
            alt="washlist"
            width={13}
            height={13}
          />
          <span className={animate ? " text-green-600  animate-ping " : ""}>
            {totalWashlist}
          </span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Washlist</DrawerTitle>
          <DrawerDescription>Your favorite products.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {washlist.map((item) => (
                <ProductList
                  key={item.productId._id}
                  role={item.productId.role}
                  img={item.productId.img}
                  title={item.productId.title}
                  price={item.productId.price}
                  _id={item.productId._id}
                  stock={item.productId.stock}
                  category={item.productId.category}
                  inWashlist={true}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <DrawerClose>
            <Button className="w-full" variant={"default"}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WashlistHeader;
