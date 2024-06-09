import { getAllCate } from "@/api/categoryServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loadCategories = createAsyncThunk(
  "cate/load-cate-detail",
  async () => {
    try {
      const res = await getAllCate()
      return res.resultObj;
    } catch (error) {
      return null;
    }
  }
);
