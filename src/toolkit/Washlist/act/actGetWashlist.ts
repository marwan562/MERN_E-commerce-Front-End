import { TWashlist } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const actGetWashlist = createAsyncThunk<
  TWashlist[],
  string | null,
  { rejectValue: string }
>("washlist/actGetWashlist", async (token, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/washlist/getAll`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        "Something went wrong with the network or fetch operation."
      );
    }

    return (await res.json()) as TWashlist[];
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred.";
    return rejectWithValue(errorMessage);
  }
});
