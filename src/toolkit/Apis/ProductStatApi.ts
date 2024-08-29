import { IProductStat, IProductsTypes } from "@/interface";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";


export interface IResProductStatByCategoryId {
  _id: string;
  productId: IProductsTypes;
  year: number;
  monthlyData: TDaysData[];
  dailyData: TDaysData[];
  yearlySalesTotal: number;
  yearlyTotalSold: number;
  __v: number;
}[]


export type TDaysData = {
  date?: Date;
  salesTotal: number;
  totalSold: number;
  _id: string;
  month?: string;
};

export const productStatApi = createApi({
  reducerPath: "productStatApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["productAdmin"],
  endpoints: (builder) => ({
    getProductStatById: builder.query<
      IProductStat,
      { id: string; token: string | null }
    >({
      query: ({ id, token }) => ({
        url: `/admin-dashboard/productStats/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
    }),
    getProductStatsByCategoryId: builder.query<
    IResProductStatByCategoryId[],
      { categoryId: string; token: string | null }
    >({
      query: ({ categoryId, token }) => ({
        url: `/admin-dashboard/proudctStatsByCategory/${categoryId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
    }),
  }),
});

export const { useGetProductStatByIdQuery ,useGetProductStatsByCategoryIdQuery} = productStatApi;
