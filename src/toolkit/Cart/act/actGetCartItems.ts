import { TCartItems } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const actGetCartItems = createAsyncThunk(
  "cart/actGetCartItems",
  async (token: string | null, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/cartitems/getCartItems`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return (await response.json()) as TCartItems[]
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);