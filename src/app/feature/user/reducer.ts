import { RootState } from '@/app/store';
import { createReducer } from '@reduxjs/toolkit';
import { loadUser } from './action';
import { ResponseUser } from '@/api/ResType';
export interface UserDefaultState {
    isAuthenticated: boolean;
    isInitialized: boolean;
    data: ResponseUser | undefined;
    isLoading: boolean;
}

const initialState: UserDefaultState = {
    isAuthenticated: false,
    isInitialized: true,
    data: undefined,
    isLoading: false,
};
const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadUser.pending, (state) => {
            state.isLoading = true;
            state.isAuthenticated =false,
            state.isInitialized = true
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.isLoading = false;
            state.isAuthenticated =true,
            state.isInitialized = true
            state.data = action.payload;
        })
        .addCase(loadUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated =false,
            state.isInitialized = false
        });
});
export const selectUser = (state: RootState) => state.user;

export default userReducer;
