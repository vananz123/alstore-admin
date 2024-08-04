import { getRoles } from "@/api/roleServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loadRoles = createAsyncThunk(
  "role/load-list-roles",
  async () => {
    try {
      const res = await getRoles()
      return res;
    } catch (error) {
      return null;
    }
  }
);
