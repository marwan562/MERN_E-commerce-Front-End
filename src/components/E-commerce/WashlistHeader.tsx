"use client";
import { useAppSelector } from "@/lib/store";
import Image from "next/image";

const WashlistHeader = () => {
  const { washlist } = useAppSelector((state) => state.washlist);
  const totalWashlist = washlist.length;
  return (
    <div className="flex items-center  space-x-1 hover:underline tracking-wide font-bold text-[15px] cursor-pointer">
      <Image src="/svg/washlist.svg" alt="washlist" width={13} height={13} />
      <span>({totalWashlist})</span>
    </div>
  );
};

export default WashlistHeader;
