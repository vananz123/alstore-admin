import { RootState } from "@/app/store";
import { createReducer } from "@reduxjs/toolkit";
import { loadRoles } from "./action";
import { RoleType } from "@/api/ResType";
export interface RoleSliceState {
  data: RoleType[];
  isLoading: boolean;
}
const initialState: RoleSliceState = {
  data: [],
  isLoading: false,
};
const roleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadRoles.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadRoles.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(loadRoles.rejected, (state) => {
      state.isLoading = false;
    });
});
export const selectRoles = (state: RootState) => state.roles;

export default roleReducer;
