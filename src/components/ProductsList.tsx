"use client";

import Image from "next/image";
import AddToCart from "./Bottons/AddToCart";
import { IProductsTypes } from "@/interface";
import Link from "next/link";
import Washlist from "./E-commerce/Washlist";
import { useAppDispatch,  } from "@/lib/store";
import { useAuth } from "@clerk/nextjs";
import { actAddWashlist } from "@/toolkit/Washlist/act/addWashlist";

interface TProps extends IProductsTypes {
  inWashlist: boolean;
}

const ProductList = ({
  role,
  img,
  title,
  price,
  cat_prefix,
  _id,
  stock,
  inWashlist,
}: TProps) => {


  return (
    <div className="relative border-2 group border-black hover:scale-95 duration-300">
      {role && (
        <div className="absolute left-6 border border-black flex bg-white">
          <div className="text-sm font-mono p-1">
            {role.toUpperCase()}
          </div>
        </div>
      )}
      <Washlist 
        productId={_id}
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
          <h2 className="text-lg">{title.toUpperCase()}</h2>
          <p className="text-md">${price.toFixed(2)}</p>
        </Link>
        <AddToCart data={{ role, img, title, price, cat_prefix, _id, stock }} />
      </div>
    </div>
  );
};

export default ProductList;
