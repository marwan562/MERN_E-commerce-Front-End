import {  createAsyncThunk } from "@reduxjs/toolkit";


type TProps = {
    token:string | null;
    productId:number;
    quantity?:number
}



export const actAddCartItem = createAsyncThunk(
  "cart/actAddCartItem",
  async ({ token, productId }: TProps, { rejectWithValue }) => {
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

      console.log(response.json)

      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
