import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import Loading from '@/pages/Loading';
import { useAuthStore } from '@/hooks';
const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAppSelector(selectUser);
    const { isToken } = useAuthStore();
    if (isLoading === true) return <Loading />;
    if (isAuthenticated === false && isToken === false)
        return <Navigate to={'/auth/login'} />;
    return <>{children}</>;
};
export default AuthGuard;
