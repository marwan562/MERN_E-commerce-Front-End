import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import { IResOrder, TStatusOrder } from "@/interface";
import { getStatusDetails } from "@/utils/getStatusOrder";
import { format } from "date-fns"

interface OrderRowProps {
  order: IResOrder;
  handleStatusChange: (orderId: string, newStatus: TStatusOrder) => void;
  handleCancelOrder: (orderId: string) => void;
}

export function OrderRow({
  order,
  handleStatusChange,
  handleCancelOrder,
}: OrderRowProps) {
  return (
    <TableRow key={order._id}>
      <TableCell>{order._id}</TableCell>
      <TableCell>{order.deliveryDetails.name}</TableCell>
      <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
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
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Change status</DropdownMenuLabel>
            {["Pending", "Processing", "Shipped", "Delivered"].map((status) => (
              <DropdownMenuItem
                key={status}
                onSelect={() => handleStatusChange(order._id, status as TStatusOrder)}
              >
                <Badge className={getStatusDetails(status as TStatusOrder).classes}>
                  {getStatusDetails(status as TStatusOrder).icon}
                  {status}
                </Badge>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={getStatusDetails("Cancelled").classes}
              onSelect={() => handleCancelOrder(order._id)}
            >
              {getStatusDetails("Cancelled").icon}
              Cancel order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
