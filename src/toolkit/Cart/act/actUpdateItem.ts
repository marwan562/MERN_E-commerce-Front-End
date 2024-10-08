import { TCartItems } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

type TProps = {
  productId: string;
  token: string | null;
};

export const actUpdateItem = createAsyncThunk(
  "cart/actUpdateItem",
  async ({ productId, token }: TProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/cartitems/updateItem`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            mode:"cors"
          },
          body: JSON.stringify({productId}),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Decrement Item Successfully");
      
      return (await response.json()) as TCartItems[];
    } catch (err) {
      toast.error(`${err}`);
      return rejectWithValue(err);
    }
  }
);
