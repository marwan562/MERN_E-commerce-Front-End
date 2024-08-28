"use client";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetAllProductsQuery } from "@/toolkit/Apis/ProductApi";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useState, useEffect, RefAttributes } from "react";
import { useGetAllCategoriesQuery } from "@/toolkit/Apis/CategoryApi";
import FilterProducts from "../../components/FilterProducts";
import ProductsTable from "../../components/ProductsTable";
import ProductsPagination from "../../components/ProductsPagination";

export default function Component() {
  const token = useAuthToken();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [role, setRole] = useState<"New" | "Sale" | "">("");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, refetch } = useGetAllProductsQuery(
    { page, token, category, role, search },
    { skip: !token }
  );
  const { data: categories } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (data) {
      setTotalPages(data.pagination.totalPages);
    }
  }, [data]);

  const handleSearchChange = (
    event: InputProps & RefAttributes<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    setPage(1);
    refetch();
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
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <FilterProducts
        role={role}
        search={search}
        category={category}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        handleRoleChange={handleRoleChange}
        handleSearchChange={handleSearchChange}
      />
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>Manage your products here</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable isLoading={isLoading} products={data?.products} />
          <div className="mt-4 flex justify-center items-center gap-3">
            <ProductsPagination
              page={data?.pagination.page}
              totalPages={data?.pagination.totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
