"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CategoriesContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Total Products</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Electronics</TableCell>
              <TableCell>150</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
                  Active
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Clothing</TableCell>
              <TableCell>200</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
                  Active
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};


export default CategoriesContent