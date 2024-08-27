"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/toolkit/Apis/OrderApi";
import { TStatusOrder } from "@/interface";
import { toast } from "sonner";
import { PaginationOrders } from "../../components/paginationOrder";
import { OrderRow } from "../../components/OrderRow";
import { useAuthToken } from "@/hooks/useAuthToken";
import { OrderTable } from "../../components/OrderTable";

export default function OrdersContent() {
  const token = useAuthToken();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TStatusOrder | "All">("All");
  const [updateOrder] = useUpdateOrderMutation();

  const { data, isLoading, isFetching, refetch } = useGetAllOrdersQuery(
    {
      token,
      page,
      status: statusFilter !== "All" ? statusFilter : undefined,
    },
    { skip: !token }
  );

  const handleStatusChange = async (orderId: string, newStatus: TStatusOrder) => {
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
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
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
              onValueChange={(value) => setStatusFilter(value as TStatusOrder | "All")}
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
        </CardContent>
      </Card>
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
    </div>
  );
}
