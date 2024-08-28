import { TResProducts } from "@/interface";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

type TPropsProducts = {
  token: string | null;
  page: number;
  search: string;
  category: string;
  role: "New" | "Sale" | "";
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["productAdmin"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<TResProducts, TPropsProducts>({
      query: ({ category, page, role, search, token }) => ({
        url: "/admin-dashboard/products",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",

        params: { category, page, role, search },
      }),
      providesTags: ["productAdmin"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
