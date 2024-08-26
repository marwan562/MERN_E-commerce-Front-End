import {
  IResOrder,
  TCreateOrder,
  TResMyOrder,
  TStatusOrder,
} from "@/interface";
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
    getMyOrders: builder.query<
      TResMyOrder,
      {
        token: string | null;
        page: number;
        status: TStatusOrder | "";
        duration: string;
      }
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
    
      providesTags: (result) =>
        result
          ? [
              { type: "myOrders", id: "LIST" },
              ...result.orders.map(({ _id }) => ({
                type: "myOrders",
                id: _id,
              })),
            ]
          : [{ type: "myOrders", id: "LIST" }],
    }),
    updateMyOrder: builder.mutation<
      IResOrder,
      { token: string | null; id: string }
    >({
      query: ({ token, id }) => ({
        url: `/user/myOrder/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "myOrders", id: "LIST" },
        { type: "myOrders", id },
      ],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,

  useGetMyOrdersQuery,
  useUpdateMyOrderMutation,
} = orderApi;
