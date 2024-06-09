import { getUser } from "@/api/userServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loadUser = createAsyncThunk(
  "user/load-user",
  async () => {
    try {
      const res = await getUser()
      console.log(res)
      return res.resultObj;
    } catch (error) {
      return null;
    }
  }
);
