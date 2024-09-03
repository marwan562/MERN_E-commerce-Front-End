import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/interface";
import { CardFooter } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";


const userFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneMobile: z.string().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;

type TProps = {
  user: User;
  isLoading: boolean;
  defaultValues: UserFormData;
  onSave: (values: UserFormData) => void;
};

const FormUserProfile = ({
  isLoading,
  defaultValues,
  onSave,
  user,
}: TProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const onSubmit = (data: UserFormData) => {
    onSave(data);
  };

  useEffect(() => {
    reset({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneMobile: user.phoneMobile,
    });
  }, [reset, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium">
          First Name
        </label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input id="firstName" placeholder="First Name" {...field} />
          )}
        />
        {errors.firstName && (
          <p className="mt-2 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last Name
        </label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input id="lastName" placeholder="Last Name" {...field} />
          )}
        />
        {errors.lastName && (
          <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input id="email" placeholder="Email" type="email" {...field} />
          )}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phoneMobile" className="block text-sm font-medium">
          Phone Number
        </label>
        <Controller
          name="phoneMobile"
          control={control}
          render={({ field }) => (
            <Input
              id="phoneMobile"
              placeholder="Phone Number"
              type="text"
              {...field}
            />
          )}
        />
        {errors.phoneMobile && (
          <p className="mt-2 text-sm text-red-600">
            {errors.phoneMobile.message}
          </p>
        )}
      </div>
      <CardFooter>
        <Button type="submit">
          {isLoading ? (
            <div className=" flex flex-row items-center gap-2">
              <LoaderCircle className="animate-spin" />
              <span> Loading...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default FormUserProfile;
