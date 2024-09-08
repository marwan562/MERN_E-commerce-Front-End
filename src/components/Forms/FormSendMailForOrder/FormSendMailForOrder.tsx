import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { User } from "@/interface";
import { Loader2 } from "lucide-react";

const mailFormSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Body Message is required" }),
  mailType: z.enum([
    "orderConfigration",
    "shippingNotification",
    "customerInquiry",
  ]),
  imageFile: z.instanceof(File).optional(),
});

type TMailFormData = z.infer<typeof mailFormSchema>;

type TProps = {
  isLoading: boolean;
  onSave: (values: FormData) => void;
};

const FormSendMailForOrder = ({ isLoading, onSave }: TProps) => {
  const form = useForm<TMailFormData>({
    resolver: zodResolver(mailFormSchema),
  });

  const onSubmit = (data: TMailFormData) => {
    const formData = new FormData();

    if (data.imageFile) {
      formData.append("imageFile", data.imageFile);
    }

    formData.append("subject", data.subject);
    formData.append("body", data.body);
    formData.append("mailType", data.mailType);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Subject..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mailType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mail Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Mail Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="orderConfigration">guration</SelectItem>
                    <SelectItem value="shippingNotification">
                      Shipping Notification
                    </SelectItem>
                    <SelectItem value="customerInquiry">
                      Customer Inquiry
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="body">Message</FormLabel>
                <FormControl>
                  <Textarea
                    id="body"
                    placeholder="Provide details about your order..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageFile"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Image File</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">
              {isLoading ? (
                <div className="flex flex-row items-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4 " />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Email"
              )}
            </Button>
          </CardFooter>
        </div>
      </form>
    </Form>
  );
};

export default FormSendMailForOrder;
