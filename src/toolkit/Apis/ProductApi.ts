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
    // Fetch all products
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

    // Create a new product
    createProduct: builder.mutation<
      void,
      { token: string | null; productData: FormData }
    >({
      query: ({ token, productData }) => ({
        url: "/admin-dashboard/createProduct",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: productData,
      }),
      invalidatesTags: ["productAdmin"],
    }),

    // Update an existing product
    updateProduct: builder.mutation<
      void,
      { token: string | null; productData: FormData ,id:string}
    >({
      query: ({ token, productData ,id}) => ({
        url: `/admin-dashboard/updateProduct/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: productData,
      }),
      invalidatesTags: ["productAdmin"],
    }),

    // Delete a product
    deleteProduct: builder.mutation<
      void,
      { token: string | null; productId: string }
    >({
      query: ({ token, productId }) => ({
        url: `/admin-dashboard/deleteProduct/${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["productAdmin"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
