import {
  Trash2,
  Eye,
  Mail,
  MailOpen,
  Package,
  Truck,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { IMail } from "@/interface";
import { format } from "date-fns";
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
} from "./ui/alert-dialog";
import { useState } from "react";

const getMailTypeIcon = (mailType: IMail["mailType"]) => {
  switch (mailType) {
    case "orderConfirmation":
      return <Package className="h-4 w-4" />;
    case "shippingNotification":
      return <Truck className="h-4 w-4" />;
    case "customerInquiry":
      return <HelpCircle className="h-4 w-4" />;
    default:
      return <Mail className="h-4 w-4" />;
  }
};

type TProps = {
  mail: IMail;
  setSelectedMail: (mail: IMail) => void;
  removeMyMialHanlder:   (mailId: string | undefined) => void;
};

const TableListMyMails = ({
  mail,
  setSelectedMail,
  removeMyMialHanlder,
}: TProps) => {
  const [isLoading , setIsLoading] = useState(false)

  const removeMyMail = async (mailId:string) => {
    try {
      setIsLoading(true)
      removeMyMialHanlder(mailId)
      setIsLoading(false)
    }catch(err){
      setIsLoading(false)
    }
  }
  return (
    <TableRow key={mail.orderId} className="group">
      <TableCell className="font-medium">
        <div className="flex items-center space-x-2">
          {getMailTypeIcon(mail.mailType)}
          <span>{mail.subject}</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {format(mail.createdAt, "PPp")}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {mail.mailType.replace(/([A-Z])/g, " $1").trim()}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          className={
            mail.status === "read"
              ? " bg-blue-500 hover:text-blue-700"
              : "  bg-green-500 hover:text-green-700"
          }
        >
          <div
        
          >
            {mail.status === "read" ? (
              <MailOpen className="h-4 w-4 mr-2" />
            ) : (
              <Mail className="h-4 w-4 mr-2" />
            )}
          </div>
          {mail.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedMail(mail)}
            className="text-amber-500 hover:text-amber-700"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  mail and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                onClick={() => removeMyMail(mail._id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableListMyMails;
