import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type TProps = {
  page: number | undefined;
  totalPages: number | undefined;
  handlePageChange: (newPage: number) => void;
};

const ProductsPagination = ({ page, totalPages, handlePageChange }: TProps) => {
  return (
    <div className="join  items-center flex flex-row  gap-3">
      <Button
        size={"icon"}
        className="join-item"
        onClick={() => handlePageChange((page ?? 1) - 1)}
        disabled={page === 1}
      >
        <ArrowLeft />
      </Button>
      <Button className="join-item">Page {page}</Button>
      <Button
        size={"icon"}
        className="join-item"
        onClick={() => handlePageChange((page ?? 1) + 1)}
        disabled={page === totalPages}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default ProductsPagination;
