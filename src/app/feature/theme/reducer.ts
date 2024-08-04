import { RootState } from "@/app/store";
import { createAction, createReducer } from "@reduxjs/toolkit";
export interface ModeSliceState {
  skin:string;
  bgColor:string;
  color:string;
}
const initialState: ModeSliceState = {
  skin: 'light',
  bgColor:'#ffffff',
  color:'#000000'
};
export const changeTheme = createAction('change/skin',function prepare(mode:string) {
  return {
    payload: mode,
  }
})
const themeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeTheme, (state ,action) => {
      if(action.payload  == 'dark'){
        state.skin =action.payload
        state.bgColor = '#1f1f1f'
        state.color = '#ffffff'
      }else{
        state.skin = action.payload
        state.bgColor = '#ffffff',
        state.color = '#000000'
      }
    })
});
export const selectTheme = (state: RootState) => state.theme;

export default themeReducer;
