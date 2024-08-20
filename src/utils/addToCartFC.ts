import { IProductsTypes } from "@/interface";

export const addToCartFC = (
  cartItems: IProductsTypes[],
  payload: IProductsTypes
) => {
  const exits = cartItems.find((item) => item._id === payload._id);

  if (exits) {
    return cartItems.map((el) =>
      el._id === payload._id ? { ...el, quantity: (el.quantity ?? 0) + 1 } : el
    );
  }

  return [...cartItems, { ...payload, quantity: 1 }];
};
