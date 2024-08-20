import { User } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const actCreateUser = createAsyncThunk(
    "auth/actCreateUser",
    async (token: string | null, thunkApi) => {
      const { rejectWithValue } = thunkApi;
      try {
        if (!token) {
          throw new Error("No token provided");
        }
        const response = await fetch(
          `${process.env.BASE_URL}/protected-endpoint/createUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              mode: "cors",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        return await response.json() as {user:User}
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );