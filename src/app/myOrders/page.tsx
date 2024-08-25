"use client";

import React, { useEffect, useState } from "react";
import MyOrdersList from "@/components/E-commerce/MyOrdersList";
import FilterMyOrders from "@/components/FilterMyOrders";
import OrdersPagination from "@/components/OrdersPagination";
import { useGetMyOrdersQuery, useUpdateMyOrderMutation } from "@/toolkit/Apis/OrderApi";
import { TStatusOrder } from "@/interface";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

const MyOrders: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<TStatusOrder | "">("");
  const [duration, setDuration] = useState<string>("this week");
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await getToken();
      setToken(authToken);
    };
    fetchToken();
  }, [getToken]);

  const { data, isLoading ,refetch} = useGetMyOrdersQuery(
    { token, page, status, duration },
    { skip: !token }
  );

  const [updateOrder] = useUpdateMyOrderMutation();

  const handleCancelOrder = async (id: string) => {
    try {
      await updateOrder({ token, id }).unwrap()
      toast.success("Cancelled Order Successfuly.")
      // Explicitly refetch the orders after updating
      refetch();
    } catch (error) {
      toast.error("Something Went Be Wrong Try Again Later.")
    }
  };

  if (!token) {
    return <div>Please log in to view your orders.</div>;
  }

  if (isLoading) {
    return <LottieHandler type="loadingCart" />;
  }

  return (
    <section className="bg-white container mx-auto antialiased dark:bg-gray-900 py-20">
      <div className="mx-auto">
        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            My orders
          </h2>
          {/* Filter orders by status and duration */}
          <FilterMyOrders onStatusChange={setStatus} onDurationChange={setDuration} />
        </div>

        {!data?.orders.length && (
          <LottieHandler type="cartEmpty" message="Orders Not Found" />
        )}

        {/* Display the list of orders */}
        <MyOrdersList orders={data?.orders} handleCancelOrder={handleCancelOrder} />

        {/* Pagination Component */}
        <OrdersPagination
          currentPage={page}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};

export default MyOrders;
