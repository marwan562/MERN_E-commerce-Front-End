import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { ICategoriesTypes } from "@/interface";
import ImageFileSection from "./ImageFileSection"; // Adjust path as needed
import { Loader2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title must be at least 1 character." }),
    img: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
  })
  .refine((data) => data.img || data.imageFile, {
    message: "Either image URL or image file must be provided",
    path: ["imageFile"],
  });

type TProps = {
  onSave: (valueManageCategory: FormData) => void;
  isLoading?: boolean;
  defaultValues?: ICategoriesTypes | undefined;
  titleSubmit: string;
};

const FormCategory = ({
  onSave,
  defaultValues,
  isLoading,
  titleSubmit,
}: TProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          img: defaultValues.img,
        }
      : {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }

    onSave(formData);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-2">
        {/* Title Field */}
        <div className="flex flex-col w-[50%] gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Category Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image File Section */}
        <ImageFileSection />

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

export default FormCategory;
