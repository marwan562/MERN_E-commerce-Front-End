import React from "react";
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import FromCheckoutPaymentCard from "./Forms/FromCheckoutPaymentCard/FromCheckoutPaymentCard";
import { useAppSelector } from "@/lib/store";

const PaymentTab = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <TabsContent value="card">
      <Card>
        <CardHeader className="">
          <CardTitle>Card</CardTitle>
          <CardDescription>
            Users enter their card number, name, expiration date, and CVC.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 pt-2 bg-slate-100">
          <FromCheckoutPaymentCard cartLength={cartItems.length} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PaymentTab;
