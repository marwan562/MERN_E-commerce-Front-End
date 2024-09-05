import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import MyMailsSkeleton from "@/components/skeletons/MyMailsSkeleton";
import ProductsPagination from "@/app/(admin)/components/ProductsPagination";
import TableListMyMails from "@/components/Table-List-My-Mails";
import { IMail } from "@/interface";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";


const initialMails: IMail[] = [
    {
      orderId: "ORD001",
      userId: "USR001",
      adminId: "ADM001",
      subject: "Your Order #ORD001 has been confirmed",
      body: "Thank you for your purchase. Your order has been confirmed and is being processed. We appreciate your business and are working diligently to prepare your items for shipment. You will receive another notification when your order has been shipped. If you have any questions or concerns, please don't hesitate to contact our customer service team.",
      status: "unread",
      mailType: "orderConfirmation",
      image: "https://picsum.photos/seed/1/800/400",
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2023-06-01"),
    },
    {
      orderId: "ORD002",
      userId: "USR002",
      adminId: "ADM001",
      subject: "Shipping Update for Order #ORD002",
      body: "Great news! Your order has been shipped and is on its way to you. You can track your package using the following tracking number: TRACK123456. Estimated delivery date is within 3-5 business days. We hope you enjoy your purchase!",
      status: "read",
      mailType: "shippingNotification",
      image: "https://picsum.photos/seed/2/800/400",
      createdAt: new Date("2023-06-02"),
      updatedAt: new Date("2023-06-02"),
    },
    {
      orderId: "ORD003",
      userId: "USR003",
      adminId: "ADM002",
      subject: "Response to Your Inquiry #INQ001",
      body: "We have received your inquiry and our team is working on addressing your concerns. We understand how important this is to you and we're committed to providing you with the best possible solution. Our customer service representative will be in touch with you shortly with more information.",
      status: "unread",
      mailType: "customerInquiry",
      image: "https://picsum.photos/seed/3/800/400",
      createdAt: new Date("2023-06-03"),
      updatedAt: new Date("2023-06-03"),
    },
  ];


const TabListReceviedMessages = () => {
    const [mails, setMails] = useState<IMail[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMail, setSelectedMail] = useState<IMail | null>(null);
    const [typeFilter, setTypeFilter] = useState<IMail["mailType"] | "all">(
      "all"
    );
    const [statusFilter, setStatusFilter] = useState<IMail["status"] | "all">(
      "all"
    );
  
    useEffect(() => {
      setTimeout(() => {
        setMails(initialMails);
        setLoading(false);
      }, 1500);
    }, []);
  
    const toggleMailStatus = (orderId: string) => {};
  
    const filteredMails = mails.filter(
      (mail) =>
        (searchTerm === "" ||
          mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mail.orderId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (typeFilter === "all" || mail.mailType === typeFilter) &&
        (statusFilter === "all" || mail.status === statusFilter)
    );
  return (
    <Card className="w-full  ">
    <CardHeader>
      <CardTitle>Your Mailbox</CardTitle>
      <CardDescription>
        Manage your order-related communications
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by subject or order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(value) =>
            setTypeFilter(value as IMail["mailType"] | "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="orderConfirmation">
              Order Confirmation
            </SelectItem>
            <SelectItem value="shippingNotification">
              Shipping Notification
            </SelectItem>
            <SelectItem value="customerInquiry">Customer Inquiry</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as IMail["status"] | "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Un Read</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <MyMailsSkeleton />
            ) : filteredMails.length > 0 ? (
              filteredMails.map((mail) => (
                <TableListMyMails key={mail._id} mail={mail} />
              ))
            ) : (
              <LottieHandler
                type="MailBoxEmpty"
                className=" flex flex-col items-center justify-center h-[60vh] size-24 mx-auto m-auto w-auto"
                colorMessage="text-gray-500"
                message={"Mail Box Empty"}
              />
            )}
          </TableBody>
        </Table>
      </div>
      <ProductsPagination />
    </CardContent>

    <Dialog open={!!selectedMail} onOpenChange={() => setSelectedMail(null)}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {selectedMail?.subject}
          </DialogTitle>
          <DialogDescription>
            {selectedMail && format(selectedMail.createdAt, "PPpp")}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          {selectedMail?.image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={selectedMail.image}
                alt="Email attachment"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          )}
          <div className="text-lg leading-relaxed">{selectedMail?.body}</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedMail(null)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Card>
  )
}

export default TabListReceviedMessages
