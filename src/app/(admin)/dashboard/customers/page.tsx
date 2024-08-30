"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ListOrderedIcon,
  EyeIcon,
  Edit2,
  Edit3,
  Trash,
  LucideScanEye,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  useGetAllCustomerQuery,
  useUpdateRoleCustomerMutation,
} from "@/toolkit/Apis/CustomersApi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useDebounce } from "use-debounce";
import ProductsPagination from "../../components/ProductsPagination";
import FormCustomer from "../../components/Form/FomrCustomer/FormCustomer";
import { toast } from "sonner";
import Link from "next/link";

type TRoles = "user" | "admin" | "superAdmin";

type TFilter = TRoles | "all";

export default function Component() {
  const token = useAuthToken();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [filterByRole, setFilterByRole] = useState<TFilter>("all");
  const [createdAt, setCreatedAt] = useState<"latest" | "oldest">("oldest");
  const { data, refetch, isLoading } = useGetAllCustomerQuery(
    {
      page,
      token,
      search: value,
      createdAt,
      filterByRole,
    },
    { skip: !token }
  );
  const [updateRole, { isLoading: isUpdating }] =
    useUpdateRoleCustomerMutation();

  const handleUpdateRole = async ({
    id,
    role,
  }: {
    id: number;
    role: TRoles;
  }) => {
    try {
      await updateRole({ id, role, token }).unwrap();
      refetch();
      toast.success("Updated Role Successfully.");
    } catch (err) {
      toast.error("Error in server");
    }
  };

  useEffect(() => {
    if (value) {
      refetch();
    }
  }, []);

  return (
    <Card className="container mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <div className="flex items-center gap-4 w-full max-w-xl">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value as string)}
            placeholder="Search by name, email."
            className="w-full"
          />
          <Select
            value={filterByRole}
            onValueChange={(value) => setFilterByRole(value as TFilter)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superAdmin">Super-Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="h-4 w-4" />
                Sort by: Registration
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={createdAt}
                onValueChange={(value) =>
                  setCreatedAt(value as "latest" | "oldest")
                }
              >
                <DropdownMenuRadioItem value="oldest">
                  Oldest
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="latest">
                  Latest
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full  mx-auto lg:grid-cols-4 gap-6 duration-300 ">
        {data?.customers?.map((customer) => (
          <Card
            key={customer._id}
            className="w-[400px] hover:z-30 group hover:scale-105 ease-out duration-500 transform-gpu"
          >
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage
                    src={customer.imageUrl}
                    alt={customer.firstName}
                  />
                  <AvatarFallback>
                    {customer.firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold group-hover:underline">
                    {customer.firstName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customer.role?.toLocaleUpperCase()}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{customer.phoneMobile}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Registered:</span>
                  <span>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <Separator className="my-4" />

            <CardFooter className=" flex flex-row items-center justify-between">
              <Dialog>
                <DialogTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          className="bg-green-600 hover:bg-green-400"
                          size="sm"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className=" flex flex-row bg-green-400">
                        <Edit3 className="mr-1 size-4" />
                        <p>Edit Role Customer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Customer</DialogTitle>
                  </DialogHeader>
                  <FormCustomer
                    titleSubmit="Save Changes"
                    isLoading={isUpdating}
                    onSave={(value) =>
                      handleUpdateRole({ id: customer._id, role: value.role })
                    }
                    defaultValues={{
                      email: customer.email,
                      firstName: customer.firstName,
                      role: customer.role,
                      img: customer.imageUrl,
                    }}
                  />
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="destructive" size="sm">
                          <Trash className="h-4 w-4 " />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className=" flex flex-row bg-red-400">
                        <Trash2 className="mr-1 size-4" />
                        <p>Remoev The Customer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>{" "}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your Customer and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className=" bg-red-600  hover:bg-red-400">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={`/dashboard/orders/ordersCustomer/${customer._id}`}
                    >
                      <Button
                        className="bg-purple-600 hover:bg-purple-400"
                        size="sm"
                      >
                        <EyeIcon className="h-4 w-4 " />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className=" flex flex-row bg-purple-400">
                    <LucideScanEye className="mr-1 size-4" />
                    <p>Show Order This Customer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ProductsPagination
        page={page}
        onPageChange={setPage}
        totalPages={data?.pagination.totalPages}
        totalProducts={data?.pagination.totalCustomers}
      />
    </Card>
  );
}
