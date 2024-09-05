import { IMail } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  token: string | null;
  orderId?: string;
  formMail: FormData;
};

export const actCreateMyMailForOrder = createAsyncThunk(
  "mails/actCreateMyMailForOrder",
  async ({ token, formMail, orderId }: TProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    if (orderId) {
      formMail.append("orderId", orderId);
    }
    
    try {
      const res = await fetch(`${process.env.BASE_URL}/mails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formMail,
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error("NetWORK ERROR ");
      }

      return (await res.json()) as { mail: IMail };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
