import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageFileSection = () => {
  const { control, watch, setValue } = useFormContext();
  const existingImageUrl = watch("img"); // Watch for image URL
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (existingImageUrl) {
      if (typeof existingImageUrl === "string") {
        setImageSrc(existingImageUrl);
      } else if (existingImageUrl instanceof File) {
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(existingImageUrl);
      }
    }
  }, [existingImageUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setValue("imageFile", file);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Image</h2>
      <FormDescription>
        Add an image that will be displayed. Adding a new image will overwrite the existing one.
      </FormDescription>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {imageSrc && (
          <AspectRatio ratio={16 / 18}>
            <Image
            width={200}
            height={200}
              src={imageSrc as string}
              className="rounded-md object-cover h-full w-full"
              alt="Selected preview"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => {
                    field.onChange(event);
                    handleImageUpload(event);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageFileSection;
