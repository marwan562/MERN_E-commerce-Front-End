import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const FormDetailsPayment = () => {
    const {control} = useFormContext()
  return (
    <>
    <FormField
      control={control}
      name="number"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="number">Card Number</FormLabel>
          <FormControl>
            <Input
              id="number"
              placeholder="4242 4242 4242 4242"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FormField
        control={control}
        name="month"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="month">Expires Month</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger aria-label="Month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>
                      {new Date(Date.UTC(0, i)).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="year"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="year">Expires Year</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger aria-label="Year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={`${new Date().getFullYear() + i}`}
                    >
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cvc"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="cvc">CVC</FormLabel>
            <FormControl>
              <Input id="cvc" placeholder="CVC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </>
  )
}

export default FormDetailsPayment
