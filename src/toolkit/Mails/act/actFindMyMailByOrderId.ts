import { IMail } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  token: string | null;
  orderId?: string;
};

export const actFindMyMailByOrderId = createAsyncThunk(
  "mails/actFindMyMailByOrderId",
  async ({ token, orderId }: TProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    console.log("mail get by order ", { token, orderId });

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/mails/findMyEmailByOrderId?orderId=${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );

      if (!res.ok) {
        throw new Error("NetWORK ERROR ");
      }
      const data = await res.json();
      return data as { mail: IMail };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
