"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetProductStatsByCategoryIdQuery } from "@/toolkit/Apis/ProductStatApi";
import { useGetAllCategoriesQuery } from "@/toolkit/Apis/CategoryApi";
import { useAuthToken } from "@/hooks/useAuthToken";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AllProductsStatCharts() {
  const token = useAuthToken();
  const { data: categories } = useGetAllCategoriesQuery(undefined, {
    skip: !token,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("August");

  const { data: productStats, isLoading } = useGetProductStatsByCategoryIdQuery(
    {
      token,
      categoryId: selectedCategoryId,
    },
    { skip: !token || !selectedCategoryId }
  );

  if (isLoading) {
    return (
      <Card className="w-full mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  if (!selectedCategoryId && categories.length > 0) {
    setSelectedCategoryId(categories[0]._id);
  }

  const yearlyData = productStats?.map((product) => ({
    name: product.productId.title,
    salesTotal: product.yearlySalesTotal,
    totalSold: product.yearlyTotalSold,
  }));

  const allMonthlyData = productStats?.flatMap((product) =>
    product.monthlyData.map((data) => ({
      ...data,
      productName: product.productId.title,
    }))
  );

  const monthlyDataByProduct = productStats?.map((product) => ({
    name: product.productId.title,
    data: product.monthlyData,
  }));

  const allDailyData = productStats?.flatMap((product) =>
    product.dailyData.map((data) => ({
      ...data,
      productName: product.productId.title,
    }))
  );

  const filteredDailyData = allDailyData?.filter((data) => {
    const dataMonth = new Date(data.date as Date).toLocaleString("default", {
      month: "short",
    });
    return dataMonth === selectedMonth;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((pld: any, index: number) => (
            <p key={index} style={{ color: pld.color }}>
              {pld.name}: {pld.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <CardTitle>All Products Statistics for 2024</CardTitle>
        </div>
        <CardDescription>
          View yearly, monthly, and daily sales data for all products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select
            onValueChange={setSelectedCategoryId}
            value={selectedCategoryId}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="yearly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="yearly" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Yearly</span>
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Monthly</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Daily</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="yearly">
            <ScrollArea className="h-[400px]">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yearlyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="salesTotal" fill="#8884d8" name="Sales Total" />
                  <Bar dataKey="totalSold" fill="#82ca9d" name="Total Sold" />
                </BarChart>
              </ResponsiveContainer>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={allMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {monthlyDataByProduct?.map((product, index) => (
                  <Line
                    key={product.name}
                    yAxisId="left"
                    type="monotone"
                    dataKey="salesTotal"
                    data={product.data}
                    name={`${product.name} Sales`}
                    stroke={`hsl(${index * 30}, 70%, 50%)`}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="daily">
            <div className="mb-4">
              <Select onValueChange={setSelectedMonth} value={selectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredDailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="salesTotal"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Sales Total"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalSold"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                  name="Total Sold"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Total Sales</span>
              </div>
              <span className="text-2xl font-bold">
                $
                {yearlyData
                  ?.reduce((sum, product) => sum + product.salesTotal, 0)
                  .toLocaleString()}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Total Sold</span>
              </div>
              <span className="text-2xl font-bold">
                {yearlyData
                  ?.reduce((sum, product) => sum + product.totalSold, 0)
                  .toLocaleString()}
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
