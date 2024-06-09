import { RootState } from "@/app/store";
import { createReducer } from "@reduxjs/toolkit";
import { loadCategories } from "./action";
import { Category } from "@/type";
export interface CateSliceState {
  data: Category[];
  isLoading: boolean;
}
const initialState: CateSliceState = {
  data: [],
  isLoading: false,
};
const cateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadCategories.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(loadCategories.rejected, (state) => {
      state.isLoading = false;
    });
});
export const selectCategories = (state: RootState) => state.categories;

export default cateReducer;
