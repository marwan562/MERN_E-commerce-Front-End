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

import { Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IProductsTypes } from "@/interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import FormManageProduct from "./Form/FormManageProduct/FormManageProduct";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TProps = {
  isLoading: boolean;
  isUpdating: boolean;
  products: IProductsTypes[] | undefined;
  handleRemoveProduct: (id: string) => void;
  handleUpdateProduct: ({
    productData,
    id,
  }: {
    productData: FormData;
    id: string;
  }) => void;
};

const ProductsTable = ({
  products,
  isLoading,
  isUpdating,
  handleRemoveProduct,
  handleUpdateProduct,
}: TProps) => {
  const { push } = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const removeProduct = async (id: string) => {
    setIsRemoving(true);
    handleRemoveProduct(id);
    setIsRemoving(false);
  };
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
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4 text-amber-500" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[900px]">
                      <DialogHeader>
                        <DialogTitle>Create New Product</DialogTitle>
                      </DialogHeader>
                      <FormManageProduct
                        isLoading={isUpdating}
                        titleSubmit="Save Changes"
                        defaultValues={product}
                        onSave={(productData) =>
                          handleUpdateProduct({ productData, id: product._id })
                        }
                      />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="ghost" size="icon">
                        {isRemoving ? (
                          <Loader2 className="animate-spin  h-4 w-4 " />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className=" bg-red-500 hover:bg-red-400"
                          onClick={() => removeProduct(product._id)}
                        >
                          {isRemoving ? (
                            <div className="flex flex-row items-center">
                              <Loader2 className="animate-spin mr-2 h-4 w-4 " />
                              <span>Removing...</span>
                            </div>
                          ) : (
                            "Continue"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/dashboard/products/${product._id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4 text-purple-600" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </Link>
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
