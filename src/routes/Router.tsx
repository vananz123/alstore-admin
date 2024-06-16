import React, { Suspense, lazy } from 'react';
const Home = lazy(() => import('@/pages/Home'));
import { ProductList, ProductEdit, ProductAdd } from '@/pages/Product';
import { CategoriesList, CategoryEdit, CategoryAdd } from '@/pages/Category';
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
import { useRoutes } from 'react-router-dom';
import AdminLayout from '@/Layout/AdminLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import RoleGuard from './RoleGuard';
const Profile = lazy(() => import('@/pages/Profile'));
import { OrderConfirm, OrderList } from '@/pages/Order';
import { PromotionAdd, PromotionEdit, PromotionList } from '@/pages/Promotion';
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
import UserList from '@/pages/User/UserList';
import { GuarantiesAdd, GuarantiesList, GuarantiesEdit } from '@/pages/Guaranty';
import { DepartmentAdd, DepartmentEdit, DepartmentList } from '@/pages/Department';
import RoleList from '@/pages/Role/RoleList';
const RoleEdit = lazy(()=> import("@/pages/Role/RoleEdit"))
import UserEdit from '@/pages/User/UserEdit';
const Page404 = lazy(() => import('@/pages/Page404/Page404'));
const ImportInventory = lazy(()=> import("@/pages/Inventory/ImportInventory"));
const ExportInventory = lazy(()=> import("@/pages/Inventory/ExportInventory"));
const HistoryInventory = lazy(()=> import("@/pages/Inventory/HistoryInventory"));
const HistoryInventoryDetail = lazy(()=> import("@/pages/Inventory/HistoryInventoryDetail"));
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
            element: <AdminLayout />,
            children: [{ path: '*', element: <Page404 /> }],
        },
        {
            path: '/',
            element: (
                <AuthGuard>
                    <AdminLayout />
                </AuthGuard>
            ),
            children: [
                {
                    path: '/',
                    element: (
                        <RoleGuard role={['admin']}>
                            <Suspense>
                                {' '}
                                <Home />
                            </Suspense>
                        </RoleGuard>
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
                    path: 'product/add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <ProductAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product/edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <ProductEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <CategoriesList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category/add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <CategoryAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category/edit/:id',
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
                    path: 'promotion/add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <PromotionAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion/edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <PromotionEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranty',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <GuarantiesList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranty/add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <GuarantiesAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranty/edit/:id',
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
                            <RoleGuard role={['super-admin','admin', 'sale']}>
                                <UserList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'user/edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['super-admin','admin', 'sale']}>
                                <UserEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'role',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <RoleList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'role/edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['super-admin','admin']}>
                                <Suspense>
                                    <RoleEdit/>
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'department',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <DepartmentList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'department/add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <DepartmentAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                }, 
                {
                    path: 'department/edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <DepartmentEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'translation/inventory',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                               <Suspense> <HistoryInventory /></Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'translation/inventory/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                               <Suspense> <HistoryInventoryDetail /></Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'translation/inventory/import',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                               <Suspense> <ImportInventory /></Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'translation/inventory/export',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                               <Suspense> <ExportInventory /></Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                }
            ],
        },
    ]);
};
export default Router;
