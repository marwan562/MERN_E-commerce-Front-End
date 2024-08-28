"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, PlusIcon, PlusSquare } from "lucide-react";
import CategoriesList from "../../components/CategoriesList";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from "@/toolkit/Apis/CategoryApi";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Dialog } from "@radix-ui/react-dialog";
import FormCategory from "../../components/Form/FormManageCategory/FormCategory";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  const token = useAuthToken();
  const { data, refetch } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useRemoveCategoryMutation();

  const handleCreateCategory = async (formData: FormData) => {
    try {
      await createCategory({ token, formData }).unwrap();
      refetch();
      toast.success("Category Created Successfully.");
    } catch (err) {
      toast.error("Error creating category.");
    }
  };

  const handleEditCategory = async ({
    id,
    formData,
  }: {
    id: number;
    formData: FormData;
  }) => {
    try {
      await updateCategory({ token, id, formData }).unwrap();
      toast.success("Category Updated Successfully.");
      refetch();
    } catch (err) {
      toast.error("Error updating category.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory({ id, token }).unwrap();
      toast.success("Category deleted successfully.");
      refetch();
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };
  // const handleCreateProduct = (categoryId) => {};
  // const handleEditProduct = (categoryId, product) => {};
  // const handleDeleteProduct = (categoryId, productId) => {};
  return (
    <main className="flex-1 p-4 w-full">
      <div className="grid flex-1 gap-4">
        <div className="flex items-center gap-4">
          <Card className=" w-full">
            <CardHeader className=" flex  flex-row items-center justify-between">
              <CardTitle className=" underline-offset-2">
                {" "}
                Product Categories
              </CardTitle>
              <CardTitle>
                {" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="default">
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Create Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        Make changes to your Category here. Click save when you
                        {"'"}re done.
                      </DialogDescription>
                    </DialogHeader>
                    <FormCategory
                      titleSubmit="Create New Category"
                      isLoading={isCreating}
                      onSave={handleCreateCategory}
                    />
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
          </Card>
          {/* Dailog With Fomr To Edit Category */}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((category) => (
            <CategoriesList
              key={category._id}
              {...category}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
              handleEditCategory={handleEditCategory}
              handleDeleteCagegory={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
