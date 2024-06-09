import { RootState } from "@/app/store";
import { createAction, createReducer } from "@reduxjs/toolkit";
export interface OrderStatusSliceState {
  name:string;
}
const initialState: OrderStatusSliceState = {
  name:"Đang xử lý"
};
export const changeOrderStatus = createAction('change/order-status',function prepare(mode:string) {
  return {
    payload: mode,
  }
})
const orderStatusReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeOrderStatus, (state ,action) => {
      state.name = action.payload
    })
});
export const selectOrderStatus = (state: RootState) => state.orderStatus;

export default orderStatusReducer;
