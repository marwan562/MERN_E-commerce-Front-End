import { IMail, TReplies } from "@/interface";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  token: string | null;
  user: boolean;
  mailId: string;
};

export const actUpdateIsReadMail = createAsyncThunk(
  "mails/actUpdateIsReadMail",
  async ({ token, mailId, user }: TProps, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    let userId;

    if (user) {
      const { auth } = getState() as unknown as RootState;
      userId = auth.user?._id;
    }

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/admin-dashboard/mails/read/${mailId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mailId, userId }),
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
