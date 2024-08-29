import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { optional, z } from "zod";
import { Loader2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phoneMobile: z.string().optional(),
  img: z.string().optional(),
  role: z.enum(["admin", "user", "superAdmin"]),
});

export type TFormCustomer = z.infer<typeof formSchema>;

type TProps = {
  onSave: (valueManageCategory: TFormCustomer) => void;
  isLoading?: boolean;
  defaultValues?: TFormCustomer;
  titleSubmit: string;
};

const FormCustomer = ({
  onSave,
  defaultValues,
  isLoading,
  titleSubmit,
}: TProps) => {
  const form = useForm<TFormCustomer>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? defaultValues : {},
  });

  function onSubmit(values: TFormCustomer) {
    onSave(values);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-2">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 ">
          <div className=" space-y-2">
            {/* First Name Field */}
            <FormField
              disabled
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              disabled
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              disabled
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Mobile Field */}
            <FormField
              disabled
              control={form.control}
              name="phoneMobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Mobile</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Phone Mobile"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superAdmin">Super-Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AspectRatio ratio={16 / 19}>
            <Image
              width={200}
              height={200}
              src={form?.watch("img")}
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>

        {/* Form Actions */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">
            {isLoading ? (
              <div className="flex flex-row items-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4 " />
                <span>Saving...</span>
              </div>
            ) : (
              titleSubmit
            )}
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default FormCustomer;
