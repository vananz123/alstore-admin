import {getAllDepartment} from "@/api/departmentServices"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
export const loadDepartment = createAsyncThunk(
  "departmant/load-department",
  async () => {
    try {
      const res = await getAllDepartment()
      return res.resultObj;
    } catch (error) {
      return null;
    }
  }
);
export const changeDepartment = createAction('change/department',function prepare(mode:number) {
  return {
    payload: mode,
  }
})
