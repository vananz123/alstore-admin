/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { selectUser } from '@/app/feature/user/reducer';
import Loading from '@/pages/Loading';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthStore } from '@/hooks';
const clientId = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
function AuthProvider({ children }: any) {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(selectUser);
    const {isToken} = useAuthStore()
    useEffect(() => {
        if (isToken) dispatch(loadUser());
    }, [dispatch,isToken]);
    return <>{isLoading ? <Loading /> : <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>}</>;
}
export default AuthProvider;
