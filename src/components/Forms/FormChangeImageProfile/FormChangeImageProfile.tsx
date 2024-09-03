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
import { IProductsTypes } from "@/interface";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import FormImageSection from "@/app/(admin)/components/Form/FormManageProduct/FormImageSection";

const formSchema = z
  .object({
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
  defaultValues?: string | undefined;
  titleSubmit: string;
};

const FormChangeImageProfile = ({
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

    onSave(formData);
  };

  useEffect(() => {
    form.reset({
      img:defaultValues
    });
  }, [defaultValues, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="  space-y-3">
          <FormImageSection />
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

export default FormChangeImageProfile;
