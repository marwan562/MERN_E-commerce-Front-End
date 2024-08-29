import { TResCustomers, User } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TRoles = "user" | "admin" | "superAdmin";

type TPropsCustomers = {
  token: string | null;
  page: number;
  search: string;
  createdAt: "latest" | "oldest";
  filterByRole: TRoles | "all";
};

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["customers"],
  endpoints: (build) => ({
    getAllCustomer: build.query<TResCustomers, TPropsCustomers>({
      query: ({ token, filterByRole, page, search, createdAt }) => ({
        url: `/admin-dashboard/customers`,
        params: {
          page,
          search,
          createdAt,
          filterByRole,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["customers"],
    }),
    updateRoleCustomer: build.mutation<
      User,
      { token: string | null; role: TRoles; id: string }
    >({
      query: ({ id, role, token }) => ({
        url: `/admin-dashboard/updateUser/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({ role }),
      }),
      invalidatesTags: ["customers"],
    }),
  }),
});

export const { useGetAllCustomerQuery, useUpdateRoleCustomerMutation } =
  customersApi;
