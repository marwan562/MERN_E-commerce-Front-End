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
import { useAuthToken } from "@/hooks/useAuthToken";
import { useGetProductStatByIdQuery } from "@/toolkit/Apis/ProductStatApi";

export default function ProductStatCharts({
  params,
}: {
  params: { productId: string };
}) {
  const token = useAuthToken();
  const [selectedMonth, setSelectedMonth] = useState<string>("Jun");

  const { data: productStat, isLoading } = useGetProductStatByIdQuery(
    { token, id: params.productId },
    { skip: !token }
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

  if (!productStat) {
    return <div>No data available</div>;
  }

  const yearlyData = [
    { name: "Yearly Sales Total", value: productStat.yearlySalesTotal },
    { name: "Yearly Total Sold", value: productStat.yearlyTotalSold },
  ];

  const filteredDailyData = productStat.dailyData.filter((data) => {
    const dataMonth = new Date(data.date).toLocaleString("default", {
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <CardTitle>Product Statistics for {productStat.year}</CardTitle>
        </div>
        <CardDescription>
          View yearly, monthly, and daily sales data
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={productStat.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
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
          <TabsContent value="daily">
            <div className="mb-4">
              <Select
                onValueChange={setSelectedMonth}
                defaultValue={selectedMonth}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  {productStat.monthlyData.map((data) => (
                    <SelectItem key={data.month} value={data?.month}>
                      {data.month}
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
                ${productStat.yearlySalesTotal.toLocaleString()}
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
                {productStat.yearlyTotalSold.toLocaleString()}
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
