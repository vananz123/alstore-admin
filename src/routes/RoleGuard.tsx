import React from 'react';
import { Role } from '@/api/ResType';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Navigate } from 'react-router-dom';
interface Props {
    children: JSX.Element;
    role: Role[];
}
const RoleGuard: React.FC<Props> = ({ children, role }) => {
    const { isAuthenticated, data } = useAppSelector(selectUser);
    if (role.indexOf(data?.roles[0]) < 0 && isAuthenticated === true) {
        return <Navigate to={'*'} />;
    }
    return <>{children}</>;
};
export default RoleGuard;
