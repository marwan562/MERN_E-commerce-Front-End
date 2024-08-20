import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetCartItems = createAsyncThunk(
  "cart/actGetCartItems",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/cartitems/getCartItems`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
