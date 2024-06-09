import { RootState } from "@/app/store";
import { createReducer } from "@reduxjs/toolkit";
import { loadCartDetail } from "./action";
import { CartResult } from "@/api/ResType";
export interface CartliceState {
  data: CartResult;
  isLoading: boolean;
}
const initialState: CartliceState = {
  data: {
      totalPrice:0,
      totalDiscount:0,
      totalPriceBeforeDiscount:0,
      items:[]
  },
  isLoading: false,
};
const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCartDetail.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadCartDetail.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(loadCartDetail.rejected, (state) => {
      state.isLoading = false;
    });
});
export const selectCartDetail = (state: RootState) => state.cart;

export default cartReducer;
