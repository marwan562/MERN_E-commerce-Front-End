import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import PaymentTab from "./PaymentTab";
import PaymentComingSoon from "./PaymentComingSoon";

export function CardsPaymentMethod() {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Choose from a variety of secure payment options to complete your
          transaction.
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="card" className=" h-full m-2 ">
        <TabsList className=" grid w-full grid-cols-3 h-full">
          <TabsTrigger value="card" className=" cursor-pointer">
            <Label className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </TabsTrigger>

          <TabsTrigger value="paypal" className=" cursor-pointer">
            <Label className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
              <Icons.paypal className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </TabsTrigger>

          <TabsTrigger value="apple" className=" cursor-pointer">
            <Label className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
              <Icons.apple className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </TabsTrigger>
        </TabsList>
        <PaymentTab />
        <PaymentComingSoon
          valueTab="paypal"
          title="Paypal"
          description="Users are redirected to PayPal for authentication and then back to complete the order."
        />
        <PaymentComingSoon
          valueTab="apple"
          title="Apple"
          description="Apple Pay allows users to make payments with just a tap or a glance, making transactions quick and easy without needing to carry physical cards."
        />
      </Tabs>

     
    </Card>
  );
}
