"use client";

import { useDebounce } from "use-debounce";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/toolkit/Apis/ProductApi";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "@/toolkit/Apis/CategoryApi";
import FilterProducts from "../../components/FilterProducts";
import ProductsTable from "../../components/ProductsTable";
import ProductsPagination from "../../components/ProductsPagination";
import { toast } from "sonner";

export default function Component() {
  const token = useAuthToken();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [role, setRole] = useState<"New" | "Sale" | "">("");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const { data, isLoading, refetch } = useGetAllProductsQuery(
    { page, token, category, role, search: value },
    { skip: !token }
  );

  const { data: categories } = useGetAllCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [removeProduct] = useDeleteProductMutation();

  // handler mutaions product DELETE,UPDATE,CREATE
  const handleCreateProduct = async (productData: FormData) => {
    try {
      await createProduct({ productData, token }).unwrap();
      toast.success("Created Product Successfully.");
      refetch();
    } catch (err) {
      toast.error(err as string);
    }
  };

  const handleUpdateProduct = async ({
    productData,
    id,
  }: {
    productData: FormData;
    id: string;
  }) => {
    try {
      await updateProduct({ productData, token, id }).unwrap();
      toast.success("Updated Product Successfully.");
      refetch();
    } catch (err) {
      toast.error(err as string);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      await removeProduct({ productId, token }).unwrap();
      toast.success("Removed Product Successfully.");
      refetch();
    } catch (err) {
      toast.error(err as string);
    }
  };
  //Filter product
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    setPage(1);
  };
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setPage(1);
    refetch();
  };

  const handleRoleChange = (selectedRole: "New" | "Sale" | "") => {
    setRole(selectedRole);
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4">
            Product Management
            <CardDescription>Manage your products here</CardDescription>
          </h1>

          <FilterProducts
            role={role}
            search={search}
            category={category}
            categories={categories}
            isCreating={isCreating}
            handleCreateProduct={handleCreateProduct}
            handleCategoryChange={handleCategoryChange}
            handleRoleChange={handleRoleChange}
            handleSearchChange={handleSearchChange}
          />
        </CardHeader>
        <CardContent>
          <ProductsTable
            isLoading={isLoading}
            products={data?.products}
            isUpdating={isUpdating}
            handleUpdateProduct={handleUpdateProduct}
            handleRemoveProduct={handleRemoveProduct}
          />
          <ProductsPagination
            page={data?.pagination.page}
            totalPages={data?.pagination.totalPages || 1}
            totalProducts={data?.pagination.totalProducts}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
