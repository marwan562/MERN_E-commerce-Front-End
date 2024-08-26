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
import { useRouter } from "next/navigation";

const MyOrders: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<TStatusOrder | "">("");
  const [duration, setDuration] = useState<string>("this week");
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

 

  const [updateOrder] = useUpdateMyOrderMutation();

  const handleCancelOrder = async (id: string) => {
    try {
      await updateOrder({ token, id }).unwrap();
      toast.success("Cancelled Order Successfully.");
      refetch();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      router.refresh();
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await getToken();
      setToken(authToken);
    };
    fetchToken();
  }, [getToken]);

  const { data, isLoading, refetch } = useGetMyOrdersQuery(
    { token, page, status, duration },
    { skip: !token, pollingInterval:3000 }
  );

  if (!token && !isLoading) {
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
            My Orders
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
