"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormImageSection from "./FormImageSection";
import FormProductDetails from "./FormProductDetails";
import { IProductsTypes } from "@/interface";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    title: z.string().min(1, {
      message: "Title is required.",
    }),
    price: z.coerce.number({ required_error: "Price is require" }),
    category: z.string().min(1, {
      message: "Category is required.",
    }),
    stock: z.coerce.number({ required_error: "Price is require" }),
    img: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
  })
  .refine((data) => data.img || data.imageFile, {
    message: "Either image URL or image file must be provided",
    path: ["imageFile"],
  });

type TProps = {
  onSave: (valueManageProduct: FormData) => void;
  isLoading?: boolean;
  defaultValues?: IProductsTypes | undefined;
  titleSubmit: string;
};

const FormManageProduct = ({
  isLoading,
  onSave,
  titleSubmit,
  defaultValues,
}: TProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }

    formData.append("title", values.title);
    formData.append("price", values.price.toString());
    formData.append("stock", values.stock.toString());
    formData.append("categoryId", values.category);
    onSave(formData);
  };

  useEffect(() => {
    form.reset({
      title: defaultValues?.title,
      category: defaultValues?.category._id,
      img: defaultValues?.img,
      stock: defaultValues?.stock,
      price: defaultValues?.price,
    });
  }, [defaultValues, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <FormProductDetails />
          </div>

          <div className="flex flex-col justify-end gap-5">
            <FormImageSection />
          </div>
        </div>

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
    </Form>
  );
};

export default FormManageProduct;
