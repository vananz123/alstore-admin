import React, { Suspense, lazy } from 'react';
const Home = lazy(() => import('@/pages/Home'));
import { ProductList, ProductEdit, ProductAdd } from '@/pages/Product';
import { CategoriesList, CategoryEdit, CategoryAdd } from '@/pages/Category';
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
import { useRoutes } from 'react-router-dom';
import DefaultLayout from '@/conponents/Layout/DefaultLayout';
import AdminLayout from '@/conponents/Layout/AdminLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import RoleGuard from './RoleGuard';
const Profile = lazy(() => import('@/pages/Profile'));
import { OrderConfirm, OrderList } from '@/pages/Order';
import { PromotionAdd, PromotionEdit, PromotionList } from '@/pages/Promotion';
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
import UserList from '@/pages/User/UserList';
import { GuarantiesAdd, GuarantiesList, GuarantiesEdit } from '@/pages/Guaranty';
import { DepartmentAdd, DepartmentEdit, DepartmentList } from '@/pages/Admin/Department';
const Page404 = lazy(() => import('@/pages/Page404/Page404'));
const Router: React.FC = () => {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'reset-password',
                    element: (
                        <GuestGuard>
                            <Suspense>
                                {' '}
                                <ForgotPassword />
                            </Suspense>
                        </GuestGuard>
                    ),
                },
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Suspense>
                                {' '}
                                <Login />
                            </Suspense>
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <Suspense>
                                {' '}
                                <Register />
                            </Suspense>
                        </GuestGuard>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: <DefaultLayout />,
            children: [{ path: '*', element: <Page404 /> }],
        },
        {
            path: '/',
            element: <AdminLayout />,
            children: [
                {
                    path: '/',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <Suspense>
                                    {' '}
                                    <Home />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'profile',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <Suspense>
                                    <Profile />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <ProductList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <ProductAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <ProductEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'categories',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <CategoriesList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <CategoryAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <CategoryEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <OrderList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order/detail/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <OrderConfirm />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <PromotionList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <PromotionAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <PromotionEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranties',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <GuarantiesList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranties-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <GuarantiesAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranties-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <GuarantiesEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'user',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <UserList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'departments',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <DepartmentList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'departments-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <DepartmentAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'departments-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <DepartmentEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
            ],
        },
    ]);
};
export default Router;
