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



const CustomersContent = () => { return (
  <Card>
    <CardHeader>
      <CardTitle>Customer List</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>alice@example.com</TableCell>
            <TableCell>5</TableCell>
            <TableCell>$450.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Williams</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>3</TableCell>
            <TableCell>$275.50</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

}

export default CustomersContent