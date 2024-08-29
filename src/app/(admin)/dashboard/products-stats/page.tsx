"use client";

import { useState, useEffect } from "react";
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

interface ProductStat {
  productId: string;
  productName: string;
  year: number;
  monthlyData: { month: string; salesTotal: number; totalSold: number }[];
  dailyData: { date: string; salesTotal: number; totalSold: number }[];
  yearlySalesTotal: number;
  yearlyTotalSold: number;
}

const mockData: ProductStat[] = [
  {
    productId: "1",
    productName: "Laptop",
    year: 2023,
    monthlyData: [
      { month: "Jan", salesTotal: 10000, totalSold: 50 },
      { month: "Feb", salesTotal: 12000, totalSold: 60 },
      { month: "Mar", salesTotal: 15000, totalSold: 75 },
      { month: "Apr", salesTotal: 13000, totalSold: 65 },
      { month: "May", salesTotal: 17000, totalSold: 85 },
      { month: "Jun", salesTotal: 16000, totalSold: 80 },
    ],
    dailyData: [
      { date: "2023-06-01", salesTotal: 1000, totalSold: 5 },
      { date: "2023-06-02", salesTotal: 1500, totalSold: 7 },
      { date: "2023-06-03", salesTotal: 2000, totalSold: 10 },
      { date: "2023-06-04", salesTotal: 1800, totalSold: 9 },
      { date: "2023-06-05", salesTotal: 2200, totalSold: 11 },
      { date: "2023-06-06", salesTotal: 1900, totalSold: 9 },
      { date: "2023-06-07", salesTotal: 2100, totalSold: 10 },
    ],
    yearlySalesTotal: 150000,
    yearlyTotalSold: 750,
  },
  {
    productId: "2",
    productName: "Smartphone",
    year: 2023,
    monthlyData: [
      { month: "Jan", salesTotal: 8000, totalSold: 100 },
      { month: "Feb", salesTotal: 9500, totalSold: 120 },
      { month: "Mar", salesTotal: 11000, totalSold: 140 },
      { month: "Apr", salesTotal: 10000, totalSold: 130 },
      { month: "May", salesTotal: 12500, totalSold: 160 },
      { month: "Jun", salesTotal: 12000, totalSold: 150 },
    ],
    dailyData: [
      { date: "2023-06-01", salesTotal: 800, totalSold: 10 },
      { date: "2023-06-02", salesTotal: 1200, totalSold: 15 },
      { date: "2023-06-03", salesTotal: 1500, totalSold: 20 },
      { date: "2023-06-04", salesTotal: 1300, totalSold: 17 },
      { date: "2023-06-05", salesTotal: 1700, totalSold: 22 },
      { date: "2023-06-06", salesTotal: 1400, totalSold: 18 },
      { date: "2023-06-07", salesTotal: 1600, totalSold: 21 },
    ],
    yearlySalesTotal: 120000,
    yearlyTotalSold: 1500,
  },
];

export default function AllProductsStatCharts() {
  const [productStats, setProductStats] = useState<ProductStat[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("Jun");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProductStats(mockData);
      setSelectedProduct(mockData[0].productId);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
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

  if (!productStats) {
    return <div>Error loading data</div>;
  }

  const selectedProductData = productStats.find(
    (p) => p.productId === selectedProduct
  );

  if (!selectedProductData) {
    return <div>No product selected</div>;
  }

  const yearlyData = productStats.map((product) => ({
    name: product.productName,
    salesTotal: product.yearlySalesTotal,
    totalSold: product.yearlyTotalSold,
  }));

  const filteredDailyData = selectedProductData.dailyData.filter((data) => {
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
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <CardTitle>
            All Products Statistics for {selectedProductData.year}
          </CardTitle>
        </div>
        <CardDescription>
          View yearly, monthly, and daily sales data for all products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={setSelectedProduct} value={selectedProduct}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {productStats.map((product) => (
                <SelectItem key={product.productId} value={product.productId}>
                  {product.productName}
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
              <LineChart data={selectedProductData.monthlyData}>
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
              <Select onValueChange={setSelectedMonth} value={selectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProductData.monthlyData.map((data) => (
                    <SelectItem key={data.month} value={data.month}>
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
                ${selectedProductData.yearlySalesTotal.toLocaleString()}
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
                {selectedProductData.yearlyTotalSold.toLocaleString()}
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
