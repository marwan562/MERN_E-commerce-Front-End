import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
import { Edit, LoaderCircle, MoveHorizontal, Trash2 } from "lucide-react";
import { IProductsTypes, TResCategoriesAdmin } from "@/interface";
import { Button } from "@/components/ui/button";
import FormCategory from "./Form/FormManageCategory/FormCategory";
import LottieHandler from "@/components/Feedback/Lottiefiles/LottieHandler";

interface TProps extends TResCategoriesAdmin {
  isUpdating: boolean;
  isDeleting: boolean;
  handleDeleteCagegory: (id: number) => void;
  handleEditCategory: ({
    id,
    formData,
  }: {
    id: number;
    formData: FormData;
  }) => void;
}

const CategoriesList = (props: TProps) => {
  const {
    _id,
    img,
    products,
    title,
    handleEditCategory,
    isUpdating,
    isDeleting,
    handleDeleteCagegory,
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title?.toLocaleUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 &&
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem
                        // handle delete product onclick={}
                        >
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {products.length === 0 && (
          <LottieHandler
            type="cartEmpty"
            className="flex flex-col items-center justify-center h-full  "
            colorMessage=" text-red-700  text-[18px] font-mono"
            message="Category Not Have Products!"
          />
        )}
      </CardContent>
      <CardFooter className=" flex flex-row items-end justify-between ">
        {/* Dailog With Fomr To Edit Category */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" /> Edit Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Make changes to your Category here. Click save when you{"'"}re
                done.
              </DialogDescription>
            </DialogHeader>
            <FormCategory
              onSave={(formData) => {
                handleEditCategory({ formData, id: _id });
              }}
              isLoading={isUpdating}
              titleSubmit="Save Changes"
              defaultValues={{ _id, img, title }}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive" size="sm">
              <span className=" flex items-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Category
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                <span className=" underline">Category</span> and remove your
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteCagegory(_id)}
                className=" bg-red-500 hover:bg-red-400 focus:bg-red-600"
              >
                {isDeleting ? (
                  <span className=" flex items-center">
                    <LoaderCircle className="h-4 w-4 mr-2" />
                    Deleting...
                  </span>
                ) : (
                  <span className=" flex items-center">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Yes, Delete Category
                  </span>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CategoriesList;
