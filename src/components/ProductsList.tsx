"use client";

import Image from "next/image";
import AddToCart from "./Bottons/AddToCart";
import { IProductsTypes } from "@/interface";
import Link from "next/link";
import Washlist from "./E-commerce/Washlist";
import { useAppDispatch } from "@/lib/store";
import { useAuth } from "@clerk/nextjs";
import { actAddWashlist } from "@/toolkit/Washlist/act/addWashlist";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface TProps extends IProductsTypes {
  inWashlist: boolean;
}

const ProductList = ({
  role,
  img,
  title,
  price,
  category,
  _id,
  stock,
  inWashlist,
}: TProps) => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToWashlist = useCallback(async () => {
    setLoading(true); // Start loading state
    try {
      const token = await getToken();
      if (token) {
        await dispatch(actAddWashlist({ productId: _id, token })).unwrap();
        toast.success("Added to your wishlist.");
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error("Failed to add to wishlist.");
    } finally {
      setLoading(false);
    }
  }, [_id, dispatch, getToken]);

  return (
    <div className="relative border-2 group border-black hover:scale-95 duration-300">
      {role && (
        <div className="absolute left-6 border border-black flex bg-white">
          <div className="text-sm font-mono p-1">{role.toUpperCase()}</div>
        </div>
      )}
      <Washlist
        loading={loading}
        handleAddToWashlist={handleAddToWashlist}
        inWashlist={inWashlist}
      />
      <Image
        className="border-b border-black"
        src={img}
        alt={title}
        width={350}
        height={450}
        layout="responsive"
      />
      <div className="flex items-center justify-between p-2">
        <Link
          href={`/details-product/${_id}`}
          className="font-mono group-hover:underline cursor-pointer ml-3"
        >
          <h2 className="text-lg">{title?.toUpperCase()}</h2>
          <p className="text-md">${price?.toFixed(2)}</p>
        </Link>
        <AddToCart data={{ role, img, title, price, category, _id, stock }} />
      </div>
    </div>
  );
};

export default ProductList;
