import React from "react";
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type TProps = {
  valueTab: string;
  title: string;
  description: string;
};

const PaymentComingSoon = ({ description, title, valueTab }: TProps) => {
  return (
    <TabsContent value={valueTab}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col bg-slate-100 space-y-4 h-[10vh] justify-center items-center">
          <div className=" text-2xl font-serif">
            {title} Will Coming Soon...
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PaymentComingSoon;
