import React, { useEffect, useState } from "react";
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
import { User } from "@/interface";
import {
  checkoutSchema,
  TFormPaymentCard,
} from "../validations/checkoutSchemaCardPayment";

type TProps = {
  cartLength: number;
  defaultValues?: TFormPaymentCard;
  user?: User | null;
  onSubmit: (val: TFormPaymentCard) => void;
};

export default function FromCheckoutPaymentCard({
  cartLength,
  user,
  defaultValues,
  onSubmit,
}: TProps) {
  const form = useForm<TFormPaymentCard>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmitForm = (data: TFormPaymentCard) => {
    onSubmit(data);
  };

  const handleContinue = () => {
    if (Object.keys(errors).length === 0) {
      setShowCardDetails(true);
    } else {
      console.log("Form has errors");
    }
  };

  const handleDialogOpen = () => {
    if (Object.keys(errors).length === 0) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    handleSubmit(onSubmitForm)();
    setIsDialogOpen(false); 
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.firstName,
        email: user.email,
      });
    }
  }, [form, user]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <FormDetailsUser />

        {showCardDetails && <FormDetailsPayment />}

        {showCardDetails ? (
          cartLength > 0 ? (
            <>
              {/* Trigger to open the AlertDialog when "Payment Order" button is clicked */}
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
                      This action will create the order. Please confirm to
                      proceed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleDialogClose}>
                      Cancel
                    </AlertDialogCancel>
                    {/* Confirm button triggers form submission */}
                    <AlertDialogAction type="button" onClick={handleConfirm}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Button type="button">
              <Link href="/categories">Cart Empty, Go To Shopping</Link>
            </Button>
          )
        ) : (
          <Button onClick={handleContinue}>Continue</Button>
        )}
      </form>
    </Form>
  );
}
