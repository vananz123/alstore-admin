import React, { Suspense, lazy } from 'react';
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const ProductListShow = lazy(() => import('@/pages/ProductListShow'));
import { ProductList, ProductEdit, ProductAdd } from '@/pages/Admin/Product';
import { CategoriesList, CategoryEdit, CategoryAdd } from '@/pages/Admin/Category';
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
import { useRoutes } from 'react-router-dom';
import DefaultLayout from '@/conponents/Layout/DefaultLayout';
import AdminLayout from '@/conponents/Layout/AdminLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import RoleGuard from './RoleGuard';
const Profile = lazy(() => import('@/pages/Profile'));
const Cart = lazy(() => import('@/pages/Cart'));
import Purchase from '@/pages/Purchase';
import Checkout from '@/pages/Pay/Checkout';
import CheckoutVnpay from '@/pages/Pay/CheckoutVnpay';
import { OrderConfirm, OrderList } from '@/pages/Admin/Order';
const UserOrderDetail = lazy(() => import('@/pages/UserOrderDetail'));
const UserOrderList = lazy(() => import('@/pages/UserOrderList'));
import { PromotionAdd, PromotionEdit, PromotionList } from '@/pages/Admin/Promotion';
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
import UserList from '@/pages/Admin/User/UserList';
import { GuarantiesAdd, GuarantiesList, GuarantiesEdit } from '@/pages/Admin/Guaranty';
const Page404 = lazy(() => import('@/pages/Page404/Page404'));
const ProfileAdmin = lazy(() => import('@/pages/Admin/Profile'));
import LoginAdmin from '@/pages/Admin/LoginAdmin';
import { DepartmentAdd, DepartmentEdit, DepartmentList } from '@/pages/Admin/Department';
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
                    path: 'login-admin',
                    element: (
                        <GuestGuard>
                            <LoginAdmin />
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
            element: <DefaultLayout />,
            children: [
                {
                    path: '/',
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: 'cart',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    <Cart />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'purchase',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Purchase />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product/',
                    element: (
                        <Suspense>
                            <ProductListShow />
                        </Suspense>
                    ),
                },
                {
                    path: 'product/:id',
                    element: (
                        <Suspense>
                            <ProductListShow />
                        </Suspense>
                    ),
                },
                {
                    path: 'product/detail/:id',
                    element: (
                        <Suspense>
                            <ProductDetail />
                        </Suspense>
                    ),
                },
                {
                    path: 'profile',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    {' '}
                                    <Profile />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    {' '}
                                    <UserOrderList />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order/detail/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    {' '}
                                    <UserOrderDetail />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'checkout/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Checkout />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'checkout-vnpay',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <CheckoutVnpay />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
            ],
        },
        {
            path: 'admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <Suspense>
                                    {' '}
                                    <Dashboard />
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
                                    <ProfileAdmin />
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
