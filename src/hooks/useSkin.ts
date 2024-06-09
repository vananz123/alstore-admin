
import {  selectTheme } from '@/app/feature/theme/reducer';
import { useAppDispatch,useAppSelector } from '@/app/hooks';
import { changeTheme } from '@/app/feature/theme/reducer';
import React, { useEffect } from 'react';
const useSkin = ()=>{
    const { skin , color,bgColor} = useAppSelector(selectTheme);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const theme = localStorage.getItem('theme')
        if(theme != null){
            dispatch(changeTheme(theme))
        } 
    },[dispatch])
    const setSkin = (theme:string)=>{
        dispatch(changeTheme(theme))
        localStorage.setItem('theme',theme)
    }
    const style :React.CSSProperties = {
        backgroundColor:bgColor,
        color:color
    }
    return {color:color,bgColor:bgColor, skin:skin ,style:style,setSkin}

}
export default useSkin;