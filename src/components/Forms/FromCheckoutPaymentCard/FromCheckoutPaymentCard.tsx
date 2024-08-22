"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import FormDetailsUser from "./FormDetailsUser";
import FormDetailsPayment from "./FormDetailsPayment";
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

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(1, "Country is required"),
  number: z.string().length(16, "Card number must be 16 digits"),
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
  cvc: z.string().length(3, "CVC must be 3 digits"),
});

type TFormPaymentCard = z.infer<typeof checkoutSchema>;

type TProps = {
  cartLength: number;
};

export default function FromCheckoutPaymentCard({ cartLength }: TProps) {
  const form = useForm<TFormPaymentCard>({
    resolver: zodResolver(checkoutSchema),
  });

  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: TFormPaymentCard) => {
    console.log("Form Data:", data);
  };

  const handleContinue = () => {
    if (Object.keys(errors).length === 0) {
      setShowCardDetails(true);
    } else {
      console.log("Form has errors");
    }
  };

  const handleDialogOpen = () => {
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      setIsDialogOpen(true);
    } else {
      console.log("Form has errors, cannot open dialog");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    handleSubmit(onSubmit)();
    setIsDialogOpen(false);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormDetailsUser />

        {!showCardDetails && (
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        )}

        {showCardDetails && <FormDetailsPayment />}

        {showCardDetails && cartLength && (
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button type="button" onClick={handleDialogOpen}>
                Payment Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleDialogClose}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                  <Button type="button">Continue</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {!showCardDetails && !cartLength && (
          <Button type="button">
            <Link href="/categories">Cart Empty, Go To Shopping</Link>
          </Button>
        )}
      </form>
    </Form>
  );
}
