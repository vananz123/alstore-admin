
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { selectUser } from "@/app/feature/user/reducer";
import { useEffect, useState } from 'react';
interface AuthStoreType {
    isAuth:boolean;
    role:string;
    navigate:string;
}
const useAuthStore =()=> {
    const dispatch = useAppDispatch();
    const { data} = useAppSelector(selectUser)
    //const [accessToken,setAccessToken]=React.useState<string>()
    const setAccessToken = (accessToken:string)=>{
        localStorage.setItem('accessToken',accessToken);
        dispatch(loadUser());
    }
    const [auth,setAuth] = useState<AuthStoreType>({
        isAuth:false,
        role:'',
        navigate:''
    });
    const accessToken = localStorage.getItem('accessToken')
    const isToken = accessToken == null ? false : true
    useEffect(()=>{
        if(data){
            if(data.roles[0] === 'admin'){
                setAuth({
                    isAuth:true,
                    role:data.roles[0],
                    navigate:"/"
                })
            }
            if(data.roles[0] === 'sale'){
                setAuth({
                    isAuth:true,
                    role:data.roles[0],
                    navigate:"/order"
                })
            }
        }
    },[data])
    return {auth:auth, isToken:isToken ,setAccessToken};
}

export default useAuthStore;