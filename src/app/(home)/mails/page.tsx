"use client";
  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabListMessageSent from "./_components/Cards/TabListMessageSent";
import TabListReceviedMessages from "./_components/Cards/TabListReceviedMessages";

export default function ProfessionalMailPageWithFilters() {
  return (
    <div className="container mx-auto py-24">
      <Tabs defaultValue="messages-sent">
        <TabsList>
          <TabsTrigger value="messages-sent">Messages sent</TabsTrigger>
          <TabsTrigger value="received-messages">Received messages</TabsTrigger>
        </TabsList>
        <TabsContent value="messages-sent">
          <TabListMessageSent />
        </TabsContent>
        <TabsContent value="received-messages">
          <TabListReceviedMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
}
