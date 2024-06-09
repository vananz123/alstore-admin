import { getCart } from "@/api/cartServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loadCartDetail = createAsyncThunk(
  "cart/load-cart-detail",
  async (params: { userId: string }) => {
    const { userId } = params;
    try {
      const res = await getCart(userId)
      return res.resultObj;
    } catch (error) {
      return null;
    }
  }
);
