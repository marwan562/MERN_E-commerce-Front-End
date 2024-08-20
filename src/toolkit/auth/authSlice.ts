import { createSlice } from "@reduxjs/toolkit";
import { actCreateUser } from "./act/createUser";
import { User } from "@/interface";

type TinitialState = {
  isAuthanticated: boolean;
  status: "idle" | "pending" | "success" | "failed";
  user: User | null;
  error: string | null;
};

const initialState: TinitialState = {
  isAuthanticated: false,
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthanticated = false;
      state.status = "idle";
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(actCreateUser.pending, (state) => {
      state.status = "pending";
      state.isAuthanticated = false;
      state.error = null;
    });
    builder.addCase(actCreateUser.fulfilled, (state, action) => {
      state.status = "success";
      state.isAuthanticated = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(actCreateUser.rejected, (state, action) => {
      state.status = "failed";
      state.isAuthanticated = false;
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actCreateUser };
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
