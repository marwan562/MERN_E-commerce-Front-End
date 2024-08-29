import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AllProductsStatCharts from "./products-stats/page";
import { auth } from "@clerk/nextjs/server";
import {
  BadgeDollarSign,
  DollarSign,
  ShoppingBagIcon,
  Users,
} from "lucide-react";

type TRestOverView = {
  totalUsers: number;
  totalOrders: number;
  totalPriceOrders: number;
};

const getOverView = async (
  token: string | null
): Promise<TRestOverView | null> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/admin-dashboard/overview`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        mode: "cors",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Server responded with status: ${res.status} ${res.statusText}`
      );
    }

    return (await res.json()) as TRestOverView;
  } catch (err) {
    console.error("Failed to fetch overview:", err);
    return null;
  }
};

const OverviewContent = async () => {
  const { getToken } = auth();
  const token = await getToken();
  const overView = await getOverView(token);

  return (
    <div className=" max-h-screen grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${overView?.totalPriceOrders.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{overView?.totalUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Order</CardTitle>
          <ShoppingBagIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overView?.totalOrders}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
      <div className=" col-span-2">
        <AllProductsStatCharts />
      </div>
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2" />
            Best Selling Products
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default OverviewContent;
