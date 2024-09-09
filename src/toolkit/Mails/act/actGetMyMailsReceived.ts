import { IMail } from "@/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type TMailPagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalMails: number;
};

type TProps = {
  token: string | null;
  page: number;
  search: string;
  filterStatus: string;
  filterMailType: string;
};

type TResMail = {
  mails: IMail[];
  pagination: TMailPagination;
};

export const actGetMyMailsReceived = createAsyncThunk(
  "mails/actGetMyMailsReceived",
  async ({ token ,filterMailType,filterStatus,page,search}: TProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("search", search);
    params.append("filterStatus", filterStatus);
    params.append("filterMailType", filterMailType);

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/mails/getAllMailsReceived`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );

      if (!res.ok) {
        throw new Error("NetWORK ERROR ");
      }
      const data = await res.json();
      return data as TResMail
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
