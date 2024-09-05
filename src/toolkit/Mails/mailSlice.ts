import { IMail } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actCreateMyMailForOrder } from "./act/actCreateMyMailForOrder";
import { actFindMyMailByOrderId } from "./act/actFindMyMailByOrderId";
import { actGetAllMyMails, TMailPagination } from "./act/actGetAllMyMails";
import { object } from "zod";
import { actRemoveMyMail } from "./act/actRemoveMyMail";

interface IState {
  status: "idle" | "pending" | "success" | "failed";
  mail: IMail | null;
  mails: IMail[];
  pagination: TMailPagination;
  error: string | null;
}

const initialState: IState = {
  status: "idle",
  mail: null,
  mails: [],
  pagination: {
    page: 1,
    pageSize: 0,
    totalPages: 0,
    totalMails: 0,
  } ,
  error: null,
};


const mailsSlice = createSlice({
  name: "mails",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearMailsAction: (state) => {
      state.status = "idle";
      state.mail = null;
      state.mails = [];
      state.pagination = {
        page: 1,
        pageSize: 0,
        totalPages: 0,
        totalMails: 0,
      }
      state.error = null;
    },
  },
  extraReducers(builder) {
    //get all my mail for user
    builder
      .addCase(actGetAllMyMails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actGetAllMyMails.fulfilled, (state, action) => {
        state.status = "success";
        state.mails = action.payload.mails;
        state.pagination = action.payload.pagination;
      })
      .addCase(actGetAllMyMails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    // create new mail by order Id
    builder
      .addCase(actCreateMyMailForOrder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actCreateMyMailForOrder.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(actCreateMyMailForOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    // find mail by order id
    builder
      .addCase(actFindMyMailByOrderId.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actFindMyMailByOrderId.fulfilled, (state, action) => {
        state.status = "success";
        state.mail = action.payload.mail;
      })
      .addCase(actFindMyMailByOrderId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
      //remove my mail fron server 
      builder
      .addCase(actRemoveMyMail.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actRemoveMyMail.fulfilled, (state, action) => {
        state.status = "success";
        state.mails = state.mails.filter((mail) => mail._id !== action.payload.mail._id)
        if ( state.pagination.pageSize >= 1){
          state.pagination.pageSize = state.pagination.pageSize - 1
        }
      })
      .addCase(actRemoveMyMail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearMailsAction , setPage } = mailsSlice.actions;
export default mailsSlice.reducer;
