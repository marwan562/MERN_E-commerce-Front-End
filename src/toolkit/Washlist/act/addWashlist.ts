import { TCartItems, TWashlist } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type TProps = {
  token: string | null;
  productId: number;
};

export const actAddWashlist = createAsyncThunk(
  "cart/actAddWashlist",
  async ({ token, productId }: TProps, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/washlist/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          mode: "cors",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      toast.success("Added To You'r Washlist.");

      return (await response.json()) as TWashlist[];
    } catch (err: any) {
      toast.error(`${err}`);
      return rejectWithValue(err.message);
    }
  }
);
