import { TCartItems } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";
import { actAddCartItem } from "./act/addCartItem";
import { actGetCartItems } from "./act/actGetCartItems";
import { actDeleteItem } from "./act/actDeleteItem";
import { actUpdateItem } from "./act/actUpdateItem";

interface TState {
  cartItems: TCartItems[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TState = {
  cartItems: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cleanCartItemsAction: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actAddCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actAddCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(actAddCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(actGetCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actGetCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(actGetCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(actDeleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actDeleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(actDeleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(actUpdateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actUpdateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(actUpdateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { cleanCartItemsAction } = cartSlice.actions;

export default cartSlice.reducer;
