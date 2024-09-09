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
  tagTypes: ["myOrders", "ordersAdmin"],

  endpoints: (builder) => ({
    // Query to get all orders for admin
    getAllOrders: builder.query<
      TResMyOrder,
      {
        token: string | null;
        page: number;
        status?: TStatusOrder;
      }
    >({
      query: ({ token, page, status }) => ({
        url: "/order/getAllOrders",
        headers: { Authorization: `Bearer ${token}` },
        params: { page, status },
      }),
     providesTags:["ordersAdmin"]
    }),

    // Mutation to update order status for admin
    updateOrder: builder.mutation<
      IResOrder,
      { orderId: string; status: TStatusOrder; token: string | null }
    >({
      query: ({ orderId, status, token }) => ({
        url: `/order/updateOrder/${orderId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "ordersAdmin", id: "LIST" }, 
        { type: "ordersAdmin", id: orderId }, 
      ],
    }),

    // Query to find order by ID
    getOrderById: builder.query<
      IResOrder,
      { orderId: string | null; token: string | null }
    >({
      query: ({ orderId, token }) => ({
        url: `/order/findOrder`,
        method: "GET",
        params: { orderId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: (result) =>
        result ? [{ type: "ordersAdmin", id: result._id }] : [],
    }),

    // Mutation to create an order
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
      invalidatesTags: [{ type: "ordersAdmin", id: "LIST" }], 
    }),

    // Query to get all orders for a user
    getMyOrders: builder.query<
      TResMyOrder,
      {
        id: string | undefined;
        token: string | null;
        page: number;
        status?: TStatusOrder | "";
        duration?: string;
      }
    >({
      query: ({ token, page, status, duration, id }) => ({
        url: `/user/getAllOrders/${id}`,
        method: "GET",
        params: { status, page, duration },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["myOrders"],
    }),

    // Mutation to update order status for a user
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
      invalidatesTags: ["myOrders"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useUpdateOrderMutation,
  useUpdateMyOrderMutation,
} = orderApi;
