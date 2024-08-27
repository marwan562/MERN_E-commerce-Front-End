import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function PaginationOrders({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-between mt-4">
      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
