"use client";
import { IProductsTypes } from "@/interface";
import { useAppDispatch } from "@/lib/store";
import { setCartAction } from "@/toolkit/Cart/cartSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import { actAddCartItem } from "@/toolkit/Cart/act/addCartItem";
import { useAuth } from "@clerk/nextjs";

const AddToCart = ({ data }: { data: IProductsTypes }) => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();

  const addToCartHandler = async (data: IProductsTypes) => {
    if (data.role === "sale") {
      return toast.error("Product Saled.");
    }
    const token = await getToken();
    dispatch(
      actAddCartItem({
        productId: data._id,
        token,
      })
    ).then(() => toast.success("Added To Cart Successfully"));
  };

  return (
    <button
      onClick={() => addToCartHandler(data)}
      className="border-l hover:bg-gray-300/50 duration-200 ease-in-out h-full border-black p-5 "
      title="ADD-TO-CART"
    >
      <Image src={"/svg/cart.svg"} alt="cart" width={14} height={14} />
    </button>
  );
};

export default AddToCart;
