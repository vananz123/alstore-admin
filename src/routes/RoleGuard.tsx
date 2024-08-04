import React from 'react';
import { Role } from '@/api/ResType';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Navigate } from 'react-router-dom';
interface Props {
    children: JSX.Element;
    role?: Role[];
}
const RoleGuard: React.FC<Props> = ({ children }) => {
    const {  data } = useAppSelector(selectUser);
    if (data?.roles.includes("customer") ===true) {
        return <Navigate to={'*'} />;
    }
    return <>{children}</>;
};
export default RoleGuard;
