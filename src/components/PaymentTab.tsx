import React from "react";
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FromCheckoutPaymentCard from "./Forms/FromCheckoutPaymentCard/FromCheckoutPaymentCard";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { TFormPaymentCard } from "./Forms/validations/checkoutSchemaCardPayment";
import { useAuth } from "@clerk/nextjs";
import { useCreateOrderMutation } from "@/toolkit/Apis/OrderApi";
import { TCreateOrder } from "@/interface";
import { toast } from "sonner";
import { cleanCartItemsAction } from "@/toolkit/Cart/cartSlice";
import { useRouter } from "next/navigation";

const PaymentTab = () => {
  const { getToken } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const handleCreateOrder = async (fromCheckout: TFormPaymentCard) => {
    const token = await getToken();

    if (!token) {
      toast.error("Log in To complete your order.");
      return;
    }

    const order: TCreateOrder = {
      userId: user?._id,
      cartItems: cartItems.map(({ productId, quantity }) => ({
        title: productId.title,
        productId: productId._id,
        img: productId.img,
        price: productId.price,
        quantity,
      })),
      deliveryDetails: {
        name: fromCheckout.name,
        email: fromCheckout.email,
        city: fromCheckout.city,
        address: fromCheckout.address,
        country: fromCheckout.country,
        phoneNumber: fromCheckout.phone,
      },
    };

    try {
      const data = await createOrder({ order, token }).unwrap();
      navigate.push(`/checkout-payment?orderId=${data.userId}&status=${data}`);

      toast.success("Order Created Successfully");
      dispatch(cleanCartItemsAction());
    } catch (err) {
      toast.error("Error in server ");
    }
  };
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
          <FromCheckoutPaymentCard
            onSubmit={handleCreateOrder}
            user={user}
            cartLength={cartItems.length}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PaymentTab;
