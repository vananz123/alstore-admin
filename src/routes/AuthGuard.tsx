import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/app/hooks"
import { selectUser } from "@/app/feature/user/reducer"
import Loading from "@/pages/Loading"
import { useAuthStore } from "@/hooks"
const AuthGuard: React.FC<{children:JSX.Element}> = ({children})=>{
    const {isAuthenticated, isInitialized,isLoading} = useAppSelector(selectUser)
    const {isToken}= useAuthStore()
     console.log(isInitialized,isAuthenticated , isToken)
    if (isLoading === true)  return <Loading/>
    if(isAuthenticated === false && isInitialized ===false && isToken ===false) return <Navigate to={'/auth/login'}/>
    return <>{children}</>
}
export default AuthGuard