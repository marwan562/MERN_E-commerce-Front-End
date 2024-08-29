import { IProductStat } from "@/interface";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const productStatApi = createApi({
  reducerPath: "productStatApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["productAdmin"],
  endpoints: (builder) => ({
    getProductStatById: builder.query<IProductStat, { id: string; token: string | null }>({
      query: ({ id, token }) => ({
        url: `/admin-dashboard/productStats/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
    }),
  }),
});

export const { useGetProductStatByIdQuery } = productStatApi;
