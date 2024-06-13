import { RootState } from '@/app/store';
import { createReducer } from '@reduxjs/toolkit';
import { loadDepartment  , changeDepartment} from './action';
import { Department } from '@/type';
export interface DepartmentDefaultState {
    selected: number;
    data: Department[] | undefined;
    isLoading: boolean;
}

const initialState: DepartmentDefaultState = {
    selected:0,
    data: undefined,
    isLoading: false,
};
const departmentReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadDepartment.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loadDepartment.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.isLoading = false;
            state.selected = action.payload[0].id
            state.data = action.payload;
        })
        .addCase(loadDepartment.rejected, (state) => {
            state.isLoading = false;
        });
    builder
        .addCase(changeDepartment, (state,action)=> {
            if(state.data){
                state.selected = action.payload 
            }else{
                state.selected = 0
            }
           
        })
});
export const selectDepartment = (state: RootState) => state.department;

export default departmentReducer;
