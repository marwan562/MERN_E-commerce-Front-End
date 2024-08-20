import { IProductsTypes } from "@/interface";
import { addToCartFC } from "@/utils/addToCartFC";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actAddCartItem } from "./act/addCartItem";
import { actGetCartItems } from "./act/actGetCartItems";

interface TState {
  cartItems: IProductsTypes[];
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
    setCartAction: (state, actions: PayloadAction<IProductsTypes>) => {
      state.cartItems = addToCartFC(state.cartItems, actions.payload);
    },
    removeProductAction: (state, actions: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== actions.payload
      );
    },
    decrementItemAction: (state, action: PayloadAction<number>) => {
      const existsItem = state.cartItems.find(
        (el) => el?._id === action.payload
      );

      if (existsItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      } else {
        state.cartItems = state.cartItems.map((el) =>
          el._id === action.payload
            ? { ...el, quantity: (el.quantity ?? 0) - 1 }
            : el
        );
      }
    },
  },
  extraReducers: (builder) => {

    // add item to cart
    builder
      .addCase(actAddCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actAddCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload
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
        state.cartItems = action.payload
      })
      .addCase(actGetCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setCartAction, removeProductAction, decrementItemAction } =
  cartSlice.actions;

export default cartSlice.reducer;
