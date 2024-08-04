import { selectTheme } from '@/app/feature/theme/reducer';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeTheme } from '@/app/feature/theme/reducer';
import React, { useEffect } from 'react';
const useSkin = () => {
    const { skin, color, bgColor } = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme != null) {
            dispatch(changeTheme(theme));
        }
    }, [dispatch]);
    const root = document.documentElement;
    root?.style.setProperty('--ck-color-base-background', skin=="dark"? '#141414': '#fafafa'); 
    root?.style.setProperty('--ck-color-text', skin=="light"? '#141414': '#fafafa');
    root?.style.setProperty('--ck-color-base-border', '#bfbfbf');
    root?.style.setProperty('--ck-color-button-default-hover-background', '#bfbfbf');
    const setSkin = (theme: string) => {
        dispatch(changeTheme(theme));
        localStorage.setItem('theme', theme);
    };
    const style: React.CSSProperties = {
        backgroundColor: bgColor,
        color: color,
    };
    return { color: color, bgColor: bgColor, skin: skin, style: style, setSkin };
};
export default useSkin;
