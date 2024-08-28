import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import {  TResCategoriesAdmin } from "@/interface";
import {  RefAttributes } from "react";

type TRole = "New" | "Sale" | ""

type TProps = {
  role: TRole;
  search: string;
  category: string;
  categories: TResCategoriesAdmin[] | undefined
  handleSearchChange:(search: InputProps & RefAttributes<HTMLInputElement>) => void
  handleCategoryChange: (category: string) => void;
  handleRoleChange: (role: TRole) => void;
};

const FilterProducts = ({
  categories,
  category,
  handleCategoryChange,
  handleRoleChange,
  handleSearchChange,
  role,
  search,
}: TProps) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <Button>
        <PlusCircle className="mr-2 h-4 w-4 text-emerald-500" /> Add Product
      </Button>
      <div className="flex gap-2">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="max-w-xs"
        />
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map(({ title, _id }) => (
              <SelectItem key={_id} value={title}>
                {title}
              </SelectItem>
            ))}

            {/* Add more categories as needed */}
          </SelectContent>
        </Select>
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Sale">Sale</SelectItem>
            <SelectItem value="New">New</SelectItem>
            {/* Add more roles as needed */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterProducts;
