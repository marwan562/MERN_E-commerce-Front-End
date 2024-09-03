import { User } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TUpdateImageUser = {
  body: FormData;
  token: string | null;
};
export const actUpdateImageUser = createAsyncThunk(
  "auth/actUpdateImageUser",
  async ({ token, body }: TUpdateImageUser, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      if (!token) {
        throw new Error("No token provided");
      }
      const response = await fetch(
        `${process.env.BASE_URL}/user/updateImageUser`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          body: body,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return (await response.json()) as { imageUrl: string };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

type TUpdateInformationUser = {
  body: Partial<User>;
  token: string | null;
};
export const actUpdateInforamtionUser = createAsyncThunk(
  "auth/actUpdateInforamtionUser",
  async ({ token, body }: TUpdateInformationUser, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      if (!token) {
        throw new Error("No token provided");
      }
      const response = await fetch(
        `${process.env.BASE_URL}/user/informationUser`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return (await response.json()) as { user: User };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
