import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { IResOrder, TStatusOrder } from "@/interface";
import { OrderRow } from "./OrderRow";

interface OrderTableProps {
  orders: IResOrder[];
  isLoading: boolean;
  isFetching: boolean;
  handleStatusChange: (orderId: string, newStatus: TStatusOrder) => void;
  handleCancelOrder: (orderId: string) => void;
}

export function OrderTable({
  orders,
  isLoading,
  isFetching,
  handleStatusChange,
  handleCancelOrder,
}: OrderTableProps) {
  const renderOrderRows = () => {
    if (isLoading || isFetching) {
      return Array(10)
        .fill(0)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-8 rounded-full" />
            </TableCell>
          </TableRow>
        ));
    }

    return orders.map((order) => (
      <OrderRow
        key={order._id}
        order={order}
        handleStatusChange={handleStatusChange}
        handleCancelOrder={handleCancelOrder}
      />
    ));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderOrderRows()}</TableBody>
    </Table>
  );
}
