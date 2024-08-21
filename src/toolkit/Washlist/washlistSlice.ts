import { TWashlist } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";
import { actAddWashlist } from "./act/addWashlist";
import { actGetWashlist } from "./act/actGetWashlist";

type TProps = {
  status: "idle" | "pending" | "success" | "failed";
  washlist: TWashlist[];
  error: string | null;
};

const initialState: TProps = {
  status: "idle",
  washlist: [],
  error: null,
};

const washlistSlice = createSlice({
  name: "washlist",
  initialState,
  reducers: {
    cleanWashlistAction: (state) => {
      state.status = "idle";
      state.washlist = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    // Add to washlist
    builder
      .addCase(actAddWashlist.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actAddWashlist.fulfilled, (state, action) => {
        state.status = "success";
        state.washlist = action.payload;
      })
      .addCase(actAddWashlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    // Get all washlist
    builder
      .addCase(actGetWashlist.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actGetWashlist.fulfilled, (state, action) => {
        state.status = "success";
        state.washlist = action.payload;
      })
      .addCase(actGetWashlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { cleanWashlistAction } = washlistSlice.actions;
export default washlistSlice.reducer;
