import React, { useState } from "react";
import { IResOrder } from "@/interface";
import { getStatusDetails } from "@/utils/getStatusOrder";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

interface MyOrdersListProps {
  orders?: IResOrder[];
  handleCancelOrder: (id: string) => void;
}

const MyOrdersList = ({ orders, handleCancelOrder }: MyOrdersListProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const updateOrder = async (id: string) => {
    setIsLoading(id);
    try {
      await handleCancelOrder(id);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="mt-6 flow-root sm:mt-8">
      <div className="divide-y divide-gray-200 ">
        {orders?.map((order) => {
          const { classes, icon } = getStatusDetails(order.status);

          return (
            <div
              key={order._id}
              className="flex flex-wrap items-center gap-y-4 py-6"
            >
              {/* Order ID */}
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 ">
                  Order ID:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <a href="#" className="hover:underline">
                    #{order._id}
                  </a>
                </dd>
              </dl>

              {/* Date */}
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 ">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </dd>
              </dl>

              {/* Price */}
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 ">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  ${order.totalAmount.toFixed(2)}
                </dd>
              </dl>

              {/* Status */}
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 ">
                  Status:
                </dt>
                <dd
                  className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${classes}`}
                >
                  {icon}
                  {order.status}
                </dd>
              </dl>

              {/* Action Buttons */}
              <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                {order.status !== "Cancelled" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                        disabled={isLoading === order._id}
                      >
                        <span className="flex space-x-3 items-center">
                          {isLoading === order._id ? (
                            <>
                              <Loader2 className="animate-spin" /> Canceling...
                            </>
                          ) : (
                            "Cancel Order"
                          )}
                        </span>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your order.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="w-full rounded-lg border bg-red-100 border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                          onClick={() => updateOrder(order._id)}
                          disabled={isLoading === order._id}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Link
                  href={`/myOrders/${order._id}`}
                  className="w-full flex items-center gap-1 rounded-lg border border-gray-700 px-1  py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-500 dark:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-900 lg:w-auto"
                >
                  <Eye className="size-5 " />
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersList;
