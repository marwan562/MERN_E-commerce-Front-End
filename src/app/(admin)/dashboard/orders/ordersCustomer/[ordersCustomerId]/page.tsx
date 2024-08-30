"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  useGetMyOrdersQuery,
  useUpdateOrderMutation,
} from "@/toolkit/Apis/OrderApi";
import { useAuthToken } from "@/hooks/useAuthToken";
import { OrderTable } from "@/app/(admin)/components/OrderTable";
import { PaginationOrders } from "@/app/(admin)/components/PaginationOrder";
import { TStatusOrder } from "@/interface";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PageOrdersCustomer({
  params,
}: {
  params: { ordersCustomerId: number | undefined };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ key: "id", order: "asc" });
  const [statusFilter, setStatusFilter] = useState<TStatusOrder | "All">("All");
  
  const [page, setPage] = useState(1);
  const token = useAuthToken();

  const { data, isLoading, isFetching, refetch,isError } = useGetMyOrdersQuery(
    { id: params.ordersCustomerId, token, page },
    { skip: !token }
  );
  const totalRevenue = data?.orders.reduce(
    (acc, { totalAmount }) => acc + totalAmount,
    0
  );

  const [updateOrder] = useUpdateOrderMutation();

  const handleStatusChange = async (
    orderId: string,
    newStatus: TStatusOrder
  ) => {
    try {
      await updateOrder({ orderId, status: newStatus, token }).unwrap();
      toast.success("Update Status Order Successfully.");
      refetch();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrder({ orderId, status: "Cancelled", token }).unwrap();
      toast.success("Cancelled Order Successfully.");
      refetch();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">Orders customer</h1>
          <p className="text-muted-foreground">
            Manage and track all your customer orders.
          </p>
        </div>
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Search className="absolute top-1 left-1" />
          <Input
            type="search"
            placeholder="Search Orders By Id..."
            className=" max-w-xl rounded-lg bg-background pl-8"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {data?.orders && data?.orders.length > 0
                ? data?.orders.length
                : "Not Have Orders"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ${totalRevenue?.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="px-7">
          <div className="flex items-center justify-between">
            <CardTitle>Order History</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort.key}
                  onValueChange={(key) =>
                    setSort((prev) => ({
                      ...prev,
                      key,
                      order:
                        prev.key === key
                          ? prev.order === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                    }))
                  }
                >
                  <DropdownMenuRadioItem value="id">
                    Order ID
                    {sort.key === "id" && (
                      <span className="ml-1">
                        {sort.order === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="status">
                    Status
                    {sort.key === "status" && (
                      <span className="ml-1">
                        {sort.order === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="total">
                    Total
                    {sort.key === "total" && (
                      <span className="ml-1">
                        {sort.order === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date">
                    Date
                    {sort.key === "date" && (
                      <span className="ml-1">
                        {sort.order === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as TStatusOrder | "All")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <OrderTable
            orders={data?.orders || []}
            isLoading={isLoading}
            isFetching={isFetching}
            handleStatusChange={handleStatusChange}
            handleCancelOrder={handleCancelOrder}
          />
          <PaginationOrders
            page={page}
            totalPages={data?.pagination.totalPages || 1}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </Card>
  );
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
