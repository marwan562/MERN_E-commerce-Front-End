"use client";

import React, { useEffect, useState } from "react";
import MyOrdersList from "@/components/E-commerce/MyOrdersList";
import FilterMyOrders from "@/components/FilterMyOrders";
import OrdersPagination from "@/components/OrdersPagination";
import { useGetMyOrdersQuery } from "@/toolkit/Apis/OrderApi";
import { TStatusOrder } from "@/interface";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";
import { useAuth } from "@clerk/nextjs";

const MyOrders = () => {
  const { getToken } = useAuth();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TStatusOrder | "">("");
  const [duration, setDuration] = useState<string>("this week");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, [getToken]);

  const { data, isLoading } = useGetMyOrdersQuery(
    { token, page, status, duration }, 
    { skip: !token }
  );

  if (!token) {
    return <div>Please log in to view your orders.</div>;
  }

  if (isLoading) {
    return <LottieHandler type="loadingCart" />;
  }

  if (!data || data.orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <section className="bg-white container mx-auto antialiased dark:bg-gray-900 py-20">
      <div className="mx-auto">
        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            My orders
          </h2>
          {/* Filter orders by status and duration */}
          <FilterMyOrders
            onStatusChange={setStatus}
            onDurationChange={setDuration}
          />
        </div>

        {/* Display the list of orders */}
        <MyOrdersList orders={data.orders} />

        {/* Pagination Component */}
        <OrdersPagination
          currentPage={page}
          totalPages={data.pagination.totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};

export default MyOrders;
