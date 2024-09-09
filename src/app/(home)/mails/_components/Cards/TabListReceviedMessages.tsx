'use client'

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Search,
  Mail,
  MailOpen,
  Send,
  Loader2,
  CheckCheck,
  Check,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import MyMailsSkeleton from "@/components/skeletons/MyMailsSkeleton"
import { IMail, User } from "@/interface"
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler"
import { actGetMyMailsReceived } from "@/toolkit/Mails/act/actGetMyMailsReceived"
import { useAuthToken } from "@/hooks/useAuthToken"
import { clearMailsAction, setPage } from "@/toolkit/Mails/mailSlice"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { actUpdateIsReadMail } from "@/toolkit/Mails/actForAdmin/actUpdateIsReadMail"
import { actReplyMailToUser } from "@/toolkit/Mails/actForAdmin/actReplyMailToUser"
import ProductsPagination from "@/app/(admin)/components/ProductsPagination"

export default function Component() {
  const dispatch = useAppDispatch()
  const token = useAuthToken()
  const { mails, pagination: { page, totalMails, totalPages } } = useAppSelector((state) => state.mails)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMail, setSelectedMail] = useState<IMail | null>(null)
  const [typeFilter, setTypeFilter] = useState<IMail["mailType"] | "all">("all")
  const [statusFilter, setStatusFilter] = useState<IMail["status"] | "all">("all")
  const [replyContent, setReplyContent] = useState("")
  const [isReplying, setIsReplying] = useState(false)

  useEffect(() => {
    if (token) {
      setLoading(true)
      dispatch(actGetMyMailsReceived({ token, page, search: searchTerm, filterMailType: typeFilter, filterStatus: statusFilter }))
        .finally(() => setLoading(false))
    }
    return () => {
      dispatch(clearMailsAction())
    }
  }, [dispatch, token, page, searchTerm, typeFilter, statusFilter])

  useEffect(() => {
    if (selectedMail && mails.length) {
      const updatedMail = mails.find((mail) => mail._id === selectedMail._id)
      if (updatedMail) setSelectedMail(updatedMail)
    }
  }, [selectedMail, mails])

  const filteredMails = mails.filter(
    (mail) =>
      (searchTerm === "" ||
        mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mail.orderId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === "all" || mail.mailType === typeFilter) &&
      (statusFilter === "all" || mail.status === statusFilter)
  )

  const handleMailOpen = (mail: IMail) => {
    setSelectedMail(mail)
      dispatch(actUpdateIsReadMail({ mailId: mail._id as string, token, user:false}))
  }

  const handleReply = async () => {
    if (selectedMail && replyContent.trim()) {
      setIsReplying(true)
      try {
        await dispatch(
          actReplyMailToUser({
            token,
            content: replyContent,
            mailId: selectedMail._id as string,
          })
        )
        setReplyContent("")
      } finally {
        setIsReplying(false)
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Mailbox</CardTitle>
        <CardDescription>Manage your order-related communications</CardDescription>
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
            onValueChange={(value) => setTypeFilter(value as IMail["mailType"] | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="orderConfirmation">Order Confirmation</SelectItem>
              <SelectItem value="shippingNotification">Shipping Notification</SelectItem>
              <SelectItem value="customerInquiry">Customer Inquiry</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as IMail["status"] | "all")}
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <MyMailsSkeleton />
              ) : filteredMails.length > 0 ? (
                filteredMails.map((mail) => (
                  <TableRow key={mail._id}>
                  
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
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex gap-2 "
                            onClick={() => handleMailOpen(mail)}
                          >
                            <Eye size={16} />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh]">
                          <ScrollArea className="h-[80vh]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">
                                {selectedMail?.subject}
                              </DialogTitle>
                              <DialogDescription>
                                {selectedMail && format(new Date(selectedMail.createdAt), "PPpp")}
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
                              <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Conversation</h3>
                                <div className="space-y-4">
                                  {selectedMail?.replies &&
                                    selectedMail.replies.map((reply) => (
                                      <div
                                        key={reply._id}
                                        className={`flex ${
                                          reply.user.role === "admin" ? "justify-start" : "justify-end"
                                        }`}
                                      >
                                        <div
                                          className={`flex items-start gap-2 max-w-[70%] ${
                                            reply.user.role === "admin" ? "" : "flex-row-reverse"
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
                                                ? "bg-gray-200 rounded-tl-3xl"
                                                : "bg-blue-100 rounded-tr-3xl"
                                            }`}
                                          >
                                            <p className="text-sm">{reply.content}</p>
                                            <p className="text-xs text-gray-500 mt-2 flex flex-row gap-1 items-center">
                                              {reply.user.role === "user" && (
                                                reply.isRead ? (
                                                  <CheckCheck className="size-4 text-green-500" />
                                                ) : (
                                                  <Check className="size-4" />
                                                )
                                              )}
                                              {format(new Date(reply.timestamp), "p")}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                  <Textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
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
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setSelectedMail(null)}>
                              Close
                            </Button>
                          </DialogFooter>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <LottieHandler
                      type="MailBoxEmpty"
                      className="flex flex-col items-center justify-center h-[60vh] size-24 mx-auto m-auto w-auto"
                      colorMessage="text-gray-500"
                      message={"Mail Box Empty"}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ProductsPagination
          onPageChange={(newPage:number) => dispatch(setPage(newPage))}
          page={page}
          totalPages={totalPages}
          totalProducts={totalMails}
        />
      </CardContent>
    </Card>
  )
}