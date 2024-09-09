"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Mail,
  MailOpen,
  Send,
  Loader2,
  CheckCheck,
  Check,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useAuthToken } from "@/hooks/useAuthToken";
import { actGetAllMails } from "@/toolkit/Mails/actForAdmin/actGetAllMails";
import ProductsPagination from "../../components/ProductsPagination";
import { clearMailsAction, setPage } from "@/toolkit/Mails/mailSlice";
import { format } from "date-fns";
import { actReplyMailToUser } from "@/toolkit/Mails/actForAdmin/actReplyMailToUser";
import { IMail, User } from "@/interface";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { actUpdateIsReadMail } from "@/toolkit/Mails/actForAdmin/actUpdateIsReadMail";
import ProductsSkeletons from "@/components/skeletons/ProductsSkeletons";
import SkeletonRowsOrders from "../../components/feedback/SkeletonRowsOrders";

export default function AdminMailPage() {
  const token = useAuthToken();
  const dispatch = useAppDispatch();
  const {
    mails,
    pagination: { page, totalMails, totalPages },
  } = useAppSelector((state) => state.mails);
  const [loading, setLoading] = useState(false);
  const [selectedMail, setSelectedMail] = useState<IMail | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [replyContent, setReplyContent] = useState<string>("");
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [search] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setLoading(true);
    if (token) {
      dispatch(
        actGetAllMails({
          token,
          page,
          search,
          filterStatus,
          filterMailType: filterType,
        })
      );
    }
    setLoading(false);
    return () => {
      dispatch(clearMailsAction());
    };
  }, [token, search, filterStatus, filterType, dispatch, page]);

  useEffect(() => {
    if (selectedMail && mails.length) {
      const updatedMail = mails.find((mail) => mail._id === selectedMail._id);
      if (updatedMail) setSelectedMail(updatedMail);
    }
  }, [selectedMail, mails]);

  const handleReply = async () => {
    if (selectedMail && replyContent.trim()) {
      setIsReplying(true);
      try {
        await dispatch(
          actReplyMailToUser({
            token,
            content: replyContent,
            mailId: selectedMail._id as string,
          })
        );
        setReplyContent("");
      } finally {
        setIsReplying(false);
      }
    }
  };

  const handleMailOpen = (mail: IMail) => {
    setSelectedMail(mail);
      dispatch(actUpdateIsReadMail({ mailId: mail._id as string, token }));
  };

  return (
    <Card className="container mx-auto p-4">
      <CardHeader className="text-2xl font-bold mb-4">
        Admin Mail Management
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="w-full sm:w-auto relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search mails..."
              className="pl-8 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select onValueChange={setFilterType}>
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
                <SelectItem value="customerInquiry">
                  Customer Inquiry
                </SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading &&  <SkeletonRowsOrders />}
              {mails.map((mail) => (
                <TableRow key={mail._id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage
                          src={(mail.userId as User).imageUrl}
                          alt={`${(mail.userId as User).firstName} ${
                            (mail.userId as User).lastName
                          }`}
                        />
                        <AvatarFallback>
                          {(mail.userId as User).firstName[0]}
                          {(mail.userId as User).lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>
                          {(mail.userId as User).firstName}{" "}
                          {(mail.userId as User).lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(mail.userId as User).email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{mail.orderId}</TableCell>
                  <TableCell>{mail.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        mail.mailType === "orderConfirmation"
                          ? "default"
                          : mail.mailType === "shippingNotification"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {mail.mailType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        mail.status === "read" ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {mail.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(mail.createdAt), "PP")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex gap-2"
                            onClick={() => handleMailOpen(mail)}
                          >
                            {mail.status === "read" ? (
                              <MailOpen size={16} />
                            ) : (
                              <Mail size={16} />
                            )}
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedMail?.subject}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p>
                              <strong>From:</strong>{" "}
                              {(selectedMail?.userId as User)?.email}
                            </p>
                            <p>
                              <strong>Order ID:</strong> {selectedMail?.orderId}
                            </p>
                            <p>
                              <strong>Type:</strong> {selectedMail?.mailType}
                            </p>
                            <p>
                              <strong>Date:</strong>{" "}
                              {selectedMail?.createdAt
                                ? format(new Date(selectedMail.createdAt), "Pp")
                                : "Invalid Date"}
                            </p>
                            <div className="mt-4">
                              <p>
                                <strong>Message:</strong>
                              </p>
                              <p className="whitespace-pre-wrap">
                                {selectedMail?.body}
                              </p>
                            </div>
                            {selectedMail?.image && (
                              <div className="mt-4">
                                <p>
                                  <strong>Attachment:</strong>
                                </p>
                                <div className="relative w-full h-64 mt-2">
                                  <Image
                                    src={selectedMail.image}
                                    alt="Mail attachment"
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                              </div>
                            )}
                            <div className="mt-6">
                              <h3 className="text-lg font-semibold mb-2">
                                Conversation
                              </h3>
                              <div className="space-y-4">
                                {selectedMail?.replies &&
                                  selectedMail.replies.map((reply) => (
                                    <div
                                      key={reply._id}
                                      className={`flex ${
                                        reply.user.role === "admin"
                                          ? "justify-end"
                                          : "justify-start"
                                      }`}
                                    >
                                      <div
                                        className={`flex items-start gap-2 max-w-[70%] ${
                                          reply.user.role === "admin"
                                            ? "flex-row-reverse"
                                            : ""
                                        }`}
                                      >
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage
                                            src={reply.user.imageUrl}
                                            alt={`${reply.user.firstName} ${reply.user.lastName}`}
                                          />
                                          <AvatarFallback>
                                            {reply.user.firstName?.[0]}
                                            {reply.user.lastName?.[0]}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div
                                          className={`p-4 rounded-lg ${
                                            reply.user.role === "admin"
                                              ? "bg-gray-200"
                                              : "bg-blue-100"
                                          }`}
                                        >
                                          <p className="text-sm">
                                            {reply.content}
                                          </p>
                                          <p className="text-xs text-gray-500 mt-2 flex felx-row gap-1 items-center">
                                          {reply.user.role === "admin" && (
                                                reply.isRead ? (
                                                  <CheckCheck className="size-4 text-green-500" />
                                                ) : (
                                                  <Check className="size-4" />
                                                )
                                              )}
                                            {format(
                                              new Date(reply.timestamp),
                                              "p"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <div className="mt-6">
                                <Textarea
                                  value={replyContent}
                                  onChange={(e) =>
                                    setReplyContent(e.target.value)
                                  }
                                  placeholder="Type your reply..."
                                  rows={4}
                                />
                                <Button
                                  className="mt-4"
                                  onClick={handleReply}
                                  disabled={!replyContent.trim() || isReplying}
                                >
                                  {isReplying ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Send className="mr-2 h-4 w-4" />
                                  )}
                                  {isReplying ? "Sending..." : "Reply"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Link href={`/dashboard/orders/${mail.orderId}`}>
                        <Button className=" bg-purple-700 " size={"sm"}>
                          <Eye className="size-4 mr-2" />
                          Order{" "}
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ProductsPagination
          onPageChange={(newPage) => dispatch(setPage(newPage))}
          page={page}
          totalPages={totalPages}
          totalProducts={totalMails}
        />
      </CardContent>
    </Card>
  );
}
