import { IMail, TReplies } from "@/interface";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  token: string | null;
  mailId: string;
  content: string;
};

export const actReplyMailToUser = createAsyncThunk(
  "mails/actReplyMailToUser",
  async ({ token, content, mailId }: TProps, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { auth } = getState() as unknown as RootState;

    const userId = auth.user?._id;

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/admin-dashboard/mails/add-reply/${mailId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content, mailId, user: userId }),
          mode: "cors",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message || "Network Error";
        throw new Error(errorMessage);
      }

      return (await res.json()) as { mail: IMail };
    } catch (err) {
      return rejectWithValue(err || "An error occurred");
    }
  }
);
