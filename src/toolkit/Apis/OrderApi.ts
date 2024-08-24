import { TCreateOrder } from "@/interface"; // Ensure this path is correct
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      TCreateOrder,
      { order: TCreateOrder; token: string | null }
    >({
      query: ({ order, token }) => ({
        url: `/order/createOrder`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(order),
        mode: "cors",
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
