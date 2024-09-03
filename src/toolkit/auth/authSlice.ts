import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actCreateUser } from "./act/createUser";
import { User } from "@/interface";
import { toast } from "sonner";
import {
  actUpdateImageUser,
  actUpdateInforamtionUser,
} from "./act/actUpdateUser";

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
    builder.addCase(actUpdateInforamtionUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(
      actUpdateImageUser.fulfilled,
      (state, action: PayloadAction<{ imageUrl: string }>) => {
        state.status = "success";

        if (state.user) {
          state.user.imageUrl = action.payload.imageUrl;
        }

        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
      }
    );
  },
});

export { actCreateUser };
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
