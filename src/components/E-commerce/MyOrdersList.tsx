import React from "react";
import { IResOrder } from "@/interface";
import { getStatusDetails } from "@/utils/getStatusOrder";

interface MyOrdersListProps {
  orders: IResOrder[];
}

const MyOrdersList: React.FC<MyOrdersListProps> = ({ orders }) => {
  return (
    <div className="mt-6 flow-root sm:mt-8">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {orders.map((order) => {
          const {classes,icon} = getStatusDetails(order.status)

        

          return (
            <div
              key={order._id}
              className="flex flex-wrap items-center gap-y-4 py-6"
            >
              {/* Order ID */}

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
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
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Date:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </dd>
              </dl>

              {/* Price */}
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Price:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  ${order.totalAmount.toFixed(2)}
                </dd>
              </dl>

              {/* Status */}
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
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
                <button
                  type="button"
                  className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                >
                  Cancel order
                </button>
                <a
                  href="#"
                  className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                >
                  View details
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersList;
