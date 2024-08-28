import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FormImageSection = () => {
  const { control, watch, setValue } = useFormContext();
  const existingImageUrl = watch("img");
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
    <>
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
    </>
  );
};

export default FormImageSection;
