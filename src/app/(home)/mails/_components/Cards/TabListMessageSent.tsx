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
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { clearMailsAction, setPage } from "@/toolkit/Mails/mailSlice";
import { actGetAllMyMails } from "@/toolkit/Mails/act/actGetAllMyMails";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useDebounce } from "use-debounce";
import { actRemoveMyMail } from "@/toolkit/Mails/act/actRemoveMyMail";
import { toast } from "sonner";

const TabListMessageSent = () => {
  const token = useAuthToken();
  const dispatch = useAppDispatch();
  const { mails, pagination, status } = useAppSelector((state) => state.mails);
  const { page = 1, totalMails = 0, totalPages = 0 } = pagination || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [search] = useDebounce(searchTerm, 500);
  const [selectedMail, setSelectedMail] = useState<IMail | null>(null);
  const [filterMailType, setFilterMailType] = useState<
    IMail["mailType"] | "all"
  >("all");
  const [filterStatus, setFilterStatus] = useState<IMail["status"] | "all">(
    "all"
  );

  const removeMyMialHanlder = async (mailId:string | undefined) => {
    try {
        await dispatch(actRemoveMyMail({token,mailId})).unwrap()
    }catch(err){
      toast.error(err as string)
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(
        actGetAllMyMails({ token, page, search, filterMailType, filterStatus })
      );
    }

    return () => {
      dispatch(clearMailsAction());
    };
  }, [dispatch, filterMailType, filterStatus, page, search, token]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Messages Sent</CardTitle>
        <CardDescription>
          Manage your order-related communications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
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

          {/* Mail Type Filter */}
          <Select
            value={filterMailType}
            onValueChange={(value) =>
              setFilterMailType(value as IMail["mailType"] | "all")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="orderConfigration">
                Order Confirmation
              </SelectItem>
              <SelectItem value="shippingNotification">
                Shipping Notification
              </SelectItem>
              <SelectItem value="customerInquiry">Customer Inquiry</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filterStatus}
            onValueChange={(value) =>
              setFilterStatus(value as IMail["status"] | "all")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            {mails.length  > 0 && (
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
            )}

            {mails.length === 0 && status !== "pending" && (
              <div className="flex items-center justify-center size-[250px] mx-auto h-[65vh]">
                <LottieHandler
                  type="MailBoxEmpty"
                  size="200px"
                  className="flex flex-col items-center justify-center mx-auto"
                  colorMessage="text-gray-500"  
                  message="Mail Not Found"
                />
              </div>
            )}

            <TableBody>
              {status === "pending" ? (
                <MyMailsSkeleton />
              ) : (
                mails.length > 0 &&
                mails.map((mail) => (
                  <TableListMyMails
                    key={mail._id}
                    mail={mail}
                    setSelectedMail={setSelectedMail}
                    removeMyMialHanlder={removeMyMialHanlder}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <ProductsPagination
          page={page}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
          totalPages={totalPages}
          totalProducts={totalMails}
        />
      </CardContent>

      {/* Mail Dialog */}
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
  );
};

export default TabListMessageSent;
