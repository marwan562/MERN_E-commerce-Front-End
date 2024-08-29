import { TCartItems } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

type TProps = {
  token: string | null;
  productId: string;
  quantity?: number;
};

export const actAddCartItem = createAsyncThunk(
  "cart/actAddCartItem",
  async ({ token, productId, quantity }: TProps, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/cartitems/addItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            mode: "cors",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      if ((quantity ?? 0) > 1) {
        toast.success("Incremented item in cart successfully");
      } else {
        toast.success("Added to cart successfully");
      }

      return (await response.json()) as TCartItems[];
    } catch (err: any) {
      toast.error(`${err}`);
      return rejectWithValue(err.message);
    }
  }
);
