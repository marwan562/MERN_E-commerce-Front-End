import {
  ICategoriesTypes,
  IProductsTypes,
  TResCategoriesAdmin,
} from "@/interface";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getAllCategories: build.query<TResCategoriesAdmin[], void>({
      query: () => `/admin-dashboard/categories`,
      providesTags: (result) =>
        result ? [{ type: "Category", id: "LIST" }] : [],
    }),
    createCategory: build.mutation<
      TResCategoriesAdmin,
      { token: string | null; formData: FormData }
    >({
      query: ({ token, formData }) => ({
        url: `/admin-dashboard/categories`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
      async onQueryStarted({ token, formData }, { dispatch, queryFulfilled }) {
        try {
          const { data: newCategory } = await queryFulfilled;
          dispatch(
            categoryApi.util.updateQueryData(
              "getAllCategories",
              undefined,
              (draft) => {
                draft.push(newCategory);
              }
            )
          );
        } catch {}
      },
    }),
    updateCategory: build.mutation<
      TResCategoriesAdmin,
      { token: string | null; id: number; formData: FormData }
    >({
      query: ({ token, id, formData }) => ({
        url: `/admin-dashboard/updateCategory/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
    removeCategory: build.mutation<
      ICategoriesTypes,
      { token: string | null; id: number }
    >({
      query: ({ id, token }) => ({
        url: `/admin-dashboard/deleteCategory/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation
} = categoryApi;
