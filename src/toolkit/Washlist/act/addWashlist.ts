import { TWashlist } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

type TProps = {
  token: string | null;
  productId: number; // Update to string if API expects productId as a string
};

export const actAddWashlist = createAsyncThunk(
  "washlist/actAddWashlist",
  async ({ token, productId }: TProps, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/washlist/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to washlist");
      }

      return (await response.json()) as TWashlist[];
    } catch (err: any) {
      toast.error(`Failed to add item to washlist: ${err.message}`);
      return rejectWithValue(err.message);
    }
  }
);
