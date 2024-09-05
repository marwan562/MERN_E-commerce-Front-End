import { IMail } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  token: string | null;
  mailId: string | undefined;
};

export const actRemoveMyMail = createAsyncThunk(
  "mails/actRemoveMyMail",
  async ({ token, mailId }: TProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/mails/removeMyMail/${mailId}`,
        {
          method: "DELETE",
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
