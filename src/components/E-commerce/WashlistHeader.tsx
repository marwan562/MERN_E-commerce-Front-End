"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { actGetCartItems } from "@/toolkit/Cart/act/actGetCartItems";
import { actGetWashlist } from "@/toolkit/Washlist/act/actGetWashlist";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

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
  }, [dispatch]);
  return (
    <div className="flex items-center  space-x-1 hover:underline tracking-wide font-bold text-[15px] cursor-pointer">
      <Image src="/svg/washlist.svg" alt="washlist" width={13} height={13} />
      <span>({totalWashlist})</span>
    </div>
  );
};

export default WashlistHeader;
