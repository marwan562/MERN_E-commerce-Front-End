import { TCartItems } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

type TProps = {
  productId: string;
  token: string | null;
};

export const actDeleteItem = createAsyncThunk<TCartItems[], TProps>(
  "cart/actDeleteItem",
  async ({ productId, token }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/cartitems/deleteItem`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({productId}),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Rmove Item From Cart Successfully");
      
      return (await response.json()) as TCartItems[];
    } catch (err) {
      toast.error(`${err}`);
      return rejectWithValue(err);
    }
  }
);
