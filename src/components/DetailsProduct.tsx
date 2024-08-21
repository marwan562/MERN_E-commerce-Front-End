"use client";

import { IProductsTypes } from "@/interface";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useCallback, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { actAddWashlist } from "@/toolkit/Washlist/act/addWashlist";
import { actAddCartItem } from "@/toolkit/Cart/act/addCartItem";
import { toast } from "sonner";

const DetailsProduct = ({
  _id,
  price,
  category: { title: titleCategory },
  stock,
  title,
  role,
}: IProductsTypes) => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const { washlist } = useAppSelector((state) => state.washlist);
  const { cartItems } = useAppSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const inWashlist = washlist.some((item) => item.productId._id === _id);
  const quantity =
    cartItems.find((item) => item.productId._id === _id)?.quantity ?? 0;

  const handleAddToCart = async () => {
    if (role === "Sale" || stock === 0) {
      return toast.error("Product sold out.");
    }

    setIsAddingToCart(true);
    try {
      const token = await getToken();
      if (token) {
        await dispatch(
          actAddCartItem({ productId: _id, token, quantity })
        ).unwrap();
      } else {
        toast.error("Please log in.");
      }
    } catch (error) {
      toast.error("Failed to add to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWashlist = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (token) {
        await dispatch(actAddWashlist({ productId: _id, token }));
      } else {
        toast.error("Please log in.");
      }
    } catch (error) {
      toast.error("Failed to update wishlist.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, getToken, _id]);

  return (
    <div className="w-full md:w-1/2 px-4">
      <h2 className="text-3xl font-mono mb-2 underline">{title}</h2>
      <p className="text-gray-600 mb-4 font-mono">Category: {titleCategory}</p>
      <div className="mb-4">
        <span className="text-2xl font-bold mr-2">${price}</span>
        <span className="text-gray-500 line-through">$399.99</span>
      </div>
      <div className="flex items-center mb-4">
        {[...Array(4)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-yellow-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        ))}
        <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
      </div>
      <p className="text-gray-700 mb-6 font-mono">
        Elevate your wardrobe with this sleek leather jacket. Designed for both
        comfort and style, it features a timeless silhouette and high-quality
        leather.
      </p>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Color:</h3>
        <div className="flex space-x-2">
          <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" />
          <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
          <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quantity: <Badge>{quantity}</Badge>
        </label>
      </div>
      <div className="flex space-x-4 mb-6">
        <Button
          onClick={handleAddToCart}
          className="flex gap-2 items-center text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          {isAddingToCart ? (
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          )}
          Add to Cart
        </Button>
        <button
          onClick={handleAddToWashlist}
          className={`bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md ${
            loading ? "cursor-wait" : "hover:bg-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          disabled={loading}
        >
          {loading ? (
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className={`text-red-600 w-6 h-6 transition-transform duration-300 ${
                inWashlist ? "fill-current" : "fill-none"
              }`}
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default DetailsProduct;
