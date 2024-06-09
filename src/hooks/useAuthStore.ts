
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { selectUser } from "@/app/feature/user/reducer";
const useAuthStore =()=> {
    const dispatch = useAppDispatch();
    const { isAuthenticated} = useAppSelector(selectUser)
    //const [accessToken,setAccessToken]=React.useState<string>()
    const setAccessToken = (accessToken:string)=>{
        localStorage.setItem('accessToken',accessToken);
        dispatch(loadUser());
    }
    const accessToken = localStorage.getItem('accessToken')
    const isToken = accessToken == null ? false : true
    // useEffect(()=>{

    //     if(accessToken && accessToken != ''){
    //         localStorage.setItem('accessToken',accessToken);
    //         if(data){
    //             dispatch(loadUser());
    //         }
    //     }
    // },[dispatch,accessToken ,data])
    return {isAuth:isAuthenticated, isToken:isToken ,setAccessToken};
}

export default useAuthStore;