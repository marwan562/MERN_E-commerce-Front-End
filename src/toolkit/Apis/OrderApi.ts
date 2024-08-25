import { IResOrder, TCreateOrder, TResMyOrder, TStatusOrder } from "@/interface"; 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["myOrders"],
  endpoints: (builder) => ({
    // Find order by Id
    getOrderById: builder.query<
      IResOrder,
      { orderId: string | null; token: string | null }
    >({
      query: ({ orderId, token }) => ({
        url: `/order/findOrder?orderId=${orderId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          mode: "cors",
        },
      }),
    }),
    // Create Order
    createOrder: builder.mutation<
      IResOrder,
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
    // Get My Orders with status and duration filters
    getMyOrders: builder.query<
      TResMyOrder,
      { token: string | null; page: number; status: TStatusOrder | ""; duration: string }
    >({
      query: ({ token, page, status, duration }) => ({
        url: `/user/getAllOrders`,
        params: { status, page, duration },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["myOrders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
} = orderApi;
