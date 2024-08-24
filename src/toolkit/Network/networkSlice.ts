import { createSlice } from "@reduxjs/toolkit";

interface IState {
  network: boolean;
}

const initialState: IState = {
  network: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    getNetworkAction: (state, action) => {
      state.network = action.payload;
    },
  },
});

export const { getNetworkAction } = networkSlice.actions;
export default networkSlice.reducer;
