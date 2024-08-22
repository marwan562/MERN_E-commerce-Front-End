import z from "zod"

export const checkoutSchema = z.object({
    name: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address is required"),
    country: z.string().min(1, "Country is required"),
    number: z.string().length(16, "Card number must be 16 digits"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
    cvc: z.string().length(3, "CVC must be 3 digits"),
  });
  
export type TFormPaymentCard = z.infer<typeof checkoutSchema>;