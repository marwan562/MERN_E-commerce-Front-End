import { TStatusOrder } from "@/interface";
import { CheckCircle, XCircle, Truck, Clock, RefreshCcw } from "lucide-react";

// Function to get icon and status classes based on order status
export const getStatusDetails = (status: TStatusOrder) => {
    switch (status) {
      case "Pending":
        return {
          icon: <Clock className="mr-1 h-4 w-4" />,
          classes: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        };
      case "Processing":
        return {
          icon: <RefreshCcw className="mr-1 h-4 w-4" />,
          classes: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        };
      case "Shipped":
        return {
          icon: <Truck className="mr-1 h-4 w-4" />,
          classes: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        };
      case "Delivered":
        return {
          icon: <CheckCircle className="mr-1 h-4 w-4" />,
          classes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        };
      case "Cancelled":
        return {
          icon: <XCircle className="mr-1 h-4 w-4" />,
          classes: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        };
      default:
        return {
          icon: null,
          classes: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
        };
    }
  };
  