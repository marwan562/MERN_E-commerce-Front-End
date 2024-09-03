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
import { Button } from "@/components/ui/button";

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
      {imageSrc ? (
        <AspectRatio ratio={16 / 14}>
          <Image
            width={200}
            height={200}
            src={imageSrc as string}
            className="rounded-md object-cover h-full w-full"
            alt="Selected preview"
          />
        </AspectRatio>
      ) : (
        <AspectRatio ratio={16 / 14}>
          <Image
            width={200}
            height={200}
            src={
              "data:image/jpeg;base64,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"
            }
            className="rounded-md object-cover h-full w-full"
            alt="Selected preview"
          />
        </AspectRatio>
      )}
      <div className=" flex flex-row items-center gap-2">
        <FormField
        
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem className="">
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
        <Button type="button" onClick={() => {
          setValue("imageFile",null) 
          setImageSrc("")
        }} className="flex-1" variant={"destructive"}>Remove Image</Button>
      </div>
    </>
  );
};

export default FormImageSection;
