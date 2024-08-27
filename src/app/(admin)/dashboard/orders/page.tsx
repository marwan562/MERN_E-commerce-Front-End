"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Eye,
  XCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Truck,
  Clock,
  RefreshCcw,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/toolkit/Apis/OrderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { IResOrder, TStatusOrder } from "@/interface";
import { getStatusDetails } from "@/utils/getStatusOrder";
import { toast } from "sonner";

export default function OrdersContent() {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TStatusOrder | "All">("All");
  const [selectedOrder, setSelectedOrder] = useState<IResOrder | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, [getToken]);

  const { data, isLoading, isFetching, refetch } = useGetAllOrdersQuery(
    {
      token,
      page,
      pageSize,
      status: statusFilter !== "All" ? statusFilter : undefined,
      search: searchTerm,
    },
    { skip: !token }
  );

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
      setIsCancelDialogOpen(false);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  const renderOrderRows = () => {
    if (isLoading || isFetching) {
      return Array(pageSize)
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

    return data?.orders.map((order) => (
      <TableRow key={order._id}>
        <TableCell>{order._id}</TableCell>
        <TableCell>{order.deliveryDetails.name}</TableCell>
        <TableCell>
          {format(new Date(order.createdAt), "MMM d, yyyy")}
        </TableCell>
        <TableCell>
          <Badge className={getStatusDetails(order.status).classes}>
            {getStatusDetails(order.status).icon}
            {order.status}
          </Badge>
        </TableCell>
        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedOrder(order);
                  setIsDetailsOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change status</DropdownMenuLabel>
              {["Pending", "Processing", "Shipped", "Delivered"].map(
                (status) => (
                  <DropdownMenuItem
                    key={status}
                    onSelect={() =>
                      handleStatusChange(order._id, status as TStatusOrder)
                    }
                  >
                    <Badge
                      className={
                        getStatusDetails(status as TStatusOrder).classes
                      }
                    >
                      {getStatusDetails(status as TStatusOrder).icon}
                      {status}
                    </Badge>
                  </DropdownMenuItem>
                )
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedOrder(order);
                  setIsCancelDialogOpen(true);
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as TStatusOrder)}
          >
            <SelectTrigger>
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
        </CardHeader>
        <CardContent>
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
          <div className="flex justify-between mt-4">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              disabled={data?.pagination.page === data?.pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          {selectedOrder && (
            <DialogDescription>
              <div className="space-y-2">
                <div>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </div>
                <div>
                  <strong>Customer Name:</strong>{" "}
                  {selectedOrder.deliveryDetails.name}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {format(new Date(selectedOrder.createdAt), "MMM d, yyyy")}
                </div>
                <div>
                  <strong>Total:</strong> $
                  {selectedOrder.totalAmount.toFixed(2)}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <Badge
                    className={getStatusDetails(selectedOrder.status).classes}
                  >
                    {getStatusDetails(selectedOrder.status).icon}
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this order?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsCancelDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedOrder) {
                handleCancelOrder(selectedOrder._id);
              }
            }}
            className="ml-2"
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
