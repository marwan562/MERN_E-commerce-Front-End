"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useGetOrderByIdQuery } from "@/toolkit/Apis/OrderApi";
import {
  Package,
  Cog,
  Truck,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OrderDetailsSkeleton from "@/components/Feedback/Skeletons/OrderDetailsSkeleton";
import { TStatusOrder } from "@/interface";

const statusConfig: Record<
  TStatusOrder,
  { icon: JSX.Element; color: string; bgColor: string }
> = {
  Pending: {
    icon: <Package className="h-6 w-6" />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
  },
  Processing: {
    icon: <Cog className="h-6 w-6" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
  },
  Shipped: {
    icon: <Truck className="h-6 w-6" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
  },
  Delivered: {
    icon: <CheckCircle className="h-6 w-6" />,
    color: "text-green-500",
    bgColor: "bg-green-500",
  },
  Cancelled: {
    icon: <XCircle className="h-6 w-6" />,
    color: "text-red-500",
    bgColor: "bg-red-500",
  },
};

const statusOrder: TStatusOrder[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const ProgressIndicator = ({
  currentStatus,
}: {
  currentStatus: TStatusOrder;
}) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  const progress =
    currentStatus === "Cancelled"
      ? 100
      : (currentIndex / (statusOrder.length - 2)) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between">
        {statusOrder.map((status) => (
          <div key={status} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                status === currentStatus
                  ? statusConfig[status].bgColor
                  : "bg-gray-200"
              } text-white`}
            >
              {statusConfig[status].icon}
            </div>
            <p
              className={`mt-2 text-xs font-medium ${
                status === currentStatus
                  ? statusConfig[status].color
                  : "text-gray-500"
              }`}
            >
              {status}
            </p>
          </div>
        ))}
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${statusConfig[currentStatus].bgColor} transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default function OrderDetails({
  params,
}: {
  params: { detailsOrder: string };
}) {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  console.log(token);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, [getToken]);

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(
    { orderId: params.detailsOrder, token },
    { skip: !token, pollingInterval: 10000 }
  );

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError || !order) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load order details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="mb-6 text-3xl font-bold">Order Details</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order #{order._id}</span>
            <Badge
              variant={order.status === "Cancelled" ? "destructive" : "default"}
            >
              {order.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressIndicator currentStatus={order.status} />

          {order.status === "Cancelled" && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Order Cancelled</AlertTitle>
              <AlertDescription>
                This order has been cancelled. If you have any questions, please
                contact our customer support.
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className=" space-y-2">
                <p className="font-semibold">{order.deliveryDetails.name}</p>
                <p className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {order.deliveryDetails.address}, {order.deliveryDetails.city},{" "}
                  {order.deliveryDetails.country}
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {order.deliveryDetails.phoneNumber}
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {order.deliveryDetails.email}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatCurrency(10)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatCurrency(order.totalAmount * 0.1)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(order.totalAmount * 1.1 + 10)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
          <div className="space-y-4">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="mr-4 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  {formatCurrency(item.quantity * 99.99)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
