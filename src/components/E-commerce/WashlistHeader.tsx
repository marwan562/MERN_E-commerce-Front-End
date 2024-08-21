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
import { useEffect } from "react";
import { Button } from "../ui/button";
import ProductList from "../ProductsList";

const WashlistHeader = () => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const { washlist } = useAppSelector((state) => state.washlist);

  const totalWashlist = washlist.length;

  useEffect(() => {
    const getAllWashlist = async () => {
      const token = await getToken();
      await dispatch(actGetWashlist(token));
    };
    getAllWashlist();
  }, [dispatch, getToken]);

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
          <span>({totalWashlist})</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Washlist</DrawerTitle>
          <DrawerDescription>Your favorite products.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex overflow-x-auto space-x-4 py-2">
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
                inWashlist={true} // Assuming these items are in the washlist
              />
            ))}
          </div>
          <DrawerClose>
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WashlistHeader;
