"use client";

import { useAppDispatch } from "@/lib/store";
import { actAddWashlist } from "@/toolkit/Washlist/act/addWashlist";
import { useAuth } from "@clerk/nextjs";
import { useState, useCallback } from "react";

type TProps = {
  productId: number;
  inWashlist: boolean;
};

const Washlist = ({ productId, inWashlist }: TProps) => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  // Handler function to toggle wishlist status
  const handleAddToWashlist = useCallback(async () => {
    setLoading(true); // Start loading state
    try {
      const token = await getToken();
      if (token) {
        await dispatch(actAddWashlist({ productId, token }));
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setLoading(false); // End loading state
    }
  }, [dispatch, getToken, productId]);

  return (
    <div
      onClick={handleAddToWashlist}
      className="absolute top-3 right-4 cursor-pointer"
      role="button"
      aria-label={inWashlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {loading ? (
        <svg
          className=" animate-spin"
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
          className={`text-red-600 transition-transform duration-300 ${
            inWashlist ? "fill-current" : "fill-none"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={inWashlist ? "red" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )}
    </div>
  );
};

export default Washlist;
