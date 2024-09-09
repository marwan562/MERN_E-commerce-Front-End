import { IMail } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actCreateMyMailForOrder } from "./act/actCreateMyMailForOrder";
import { actFindMyMailByOrderId } from "./act/actFindMyMailByOrderId";
import { actGetAllMyMails, TMailPagination } from "./act/actGetAllMyMails";
import { object } from "zod";
import { actRemoveMyMail } from "./act/actRemoveMyMail";
import { actGetAllMails } from "./actForAdmin/actGetAllMails";
import { actReplyMailToUser } from "./actForAdmin/actReplyMailToUser";
import { findMailHandleReply } from "@/utils/findMailHandleReply";
import { actUpdateIsReadMail } from "./actForAdmin/actUpdateIsReadMail";
import { actGetMyMailsReceived } from "./act/actGetMyMailsReceived";

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
  },
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
        pageSize: 10,
        totalPages: 1,
        totalMails: 0,
      };
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

    // get all my mail recived for user

    builder
      .addCase(actGetMyMailsReceived.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actGetMyMailsReceived.fulfilled, (state, action) => {
        state.status = "success";
        state.mails = action.payload.mails;
        state.pagination = action.payload.pagination;
      })
      .addCase(actGetMyMailsReceived.rejected, (state, action) => {
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
        state.mails = state.mails.filter(
          (mail) => mail._id !== action.payload.mail._id
        );
        if (state.pagination.pageSize >= 1) {
          state.pagination.pageSize = state.pagination.pageSize - 1;
        }
      })
      .addCase(actRemoveMyMail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // get all mails for admin

    builder
      .addCase(actGetAllMails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(actGetAllMails.fulfilled, (state, action) => {
        state.status = "success";
        state.mails = action.payload.mails;
        state.pagination = action.payload.pagination;
      })
      .addCase(actGetAllMails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    //reply mail from admin to user
    builder.addCase(
      actReplyMailToUser.fulfilled,
      (state, action: PayloadAction<{ mail: IMail }>) => {
        const updatedMail = action.payload.mail;

        const targetMail = state.mails.find(
          (mail) => mail._id === updatedMail._id
        );

        if (targetMail) {
          const lastReply =
            updatedMail.replies?.[updatedMail.replies.length - 1];

          if (lastReply) {
            targetMail.replies = [...(targetMail.replies || []), lastReply];
          }
        }
      }
    );

    // update read mail from admin
    builder.addCase(actUpdateIsReadMail.fulfilled, (state, action) => {
      state.mails = state.mails.map((mail) =>
        mail._id === action.payload.mail._id ? { ...action.payload.mail } : mail
      );
    });
  },
});

export const { clearMailsAction, setPage } = mailsSlice.actions;
export default mailsSlice.reducer;
