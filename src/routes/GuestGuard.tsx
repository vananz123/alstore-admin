import React from "react"
import { useAppSelector } from "@/app/hooks"
import { selectUser } from "@/app/feature/user/reducer"
import { Navigate } from "react-router-dom"
const GuestGuard: React.FC<{children:JSX.Element}> = ({children})=>{
    const {isAuthenticated ,data} = useAppSelector(selectUser)
    if(isAuthenticated === true && data !== undefined){
        if(data?.roles !== undefined ){
            if(data.roles[0] === 'admin'){
                return <Navigate to={'/product'}/>
            }
            if(data?.roles[0] === 'sale') return <Navigate to={'/order'}/>
        }
    }
    return <>{children}</>
}
export default GuestGuard