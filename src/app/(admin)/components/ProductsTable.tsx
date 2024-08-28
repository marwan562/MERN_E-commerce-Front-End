import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Trash2, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IProductsTypes } from "@/interface";

type TProps = {
  isLoading: boolean;
  products: IProductsTypes[] | undefined
};

const ProductsTable = ({ isLoading, products }: TProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-10 h-10 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-16 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-20 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-12 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-14 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-20 h-8" />
                </TableCell>
              </TableRow>
            ))
          : products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image
                    width={200}
                    height={200}
                    src={product.img}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category.title}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.role === "Sale"
                        ? "bg-red-100 text-red-800"
                        : product.role === "New"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.role || "None"}
                  </span>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4 text-amber-500" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => handleDeleteProduct(product)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => handleViewProductDetails(product)}
                        >
                          <Eye className="h-4 w-4 text-purple-600" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
