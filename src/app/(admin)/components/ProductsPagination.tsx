import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaginationControlsProps {
  page: number | undefined;
  totalPages: number;
  totalProducts:number | undefined;
  onPageChange: (newPage: number) => void;
}

function ProductsPagination({
  page,
  totalPages,
  onPageChange,
  totalProducts
}: PaginationControlsProps) {
  return (
    <div className="flex justify-between mt-4">
      <Button disabled={page === 1} onClick={() => onPageChange((page ?? 1) - 1)}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Badge variant={"outline"}>Total Products: {totalProducts}</Badge>
      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange((page ?? 1) + 1)}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

export default ProductsPagination;
