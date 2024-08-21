import { TWashlist } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const actGetWashlist = createAsyncThunk<TWashlist[], void, { rejectValue: string }>(
  "washlist/actGetWashlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/washlist/getAll`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Something went wrong with the network or fetch operation.");
      }

      return (await res.json()) as TWashlist[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
