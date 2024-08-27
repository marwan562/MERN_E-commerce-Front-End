"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const OrdersContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#12345</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
                  Delivered
                </span>
              </TableCell>
              <TableCell>$120.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#12346</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-200 text-yellow-800">
                  Processing
                </span>
              </TableCell>
              <TableCell>$85.50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersContent;
