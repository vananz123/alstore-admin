import * as userServices from '@/api/userServices';
import { loadRoles } from '@/app/feature/role/action';
import { selectRoles } from '@/app/feature/role/reducer';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useNotification from '@/hooks/useNotification';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, SelectProps, Skeleton, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { selectDepartment } from '@/app/feature/department/reducer';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { isAxiosBadRequestError } from '@/utils/utils';
interface Body {
    userId: string;
    data: string[];
}
function UserEdit() {
    const { id } = useParams();
    const { showBoundary } = useErrorBoundary();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { contextHolder, openNotification } = useNotification();
    const { data: roles } = useAppSelector(selectRoles);
    const { data: departments } = useAppSelector(selectDepartment);
    const [isAddClaims, setIsAddClaims] = React.useState<boolean>(false);
    const optionRoles: SelectProps['options'] = [];
    const optionDepartment: SelectProps['options'] = [];
    const [roleKey, setRoleKey] = React.useState<string[]>([]);
    const [departmentKey, setDepartmentKey] = React.useState<string[]>([]);
    const { data: user } = useQuery({
        queryKey: [`load-user-edit-${id}`],
        queryFn: () => userServices.getUserById(id === undefined ? '' : id),
        enabled: !!id,
    });
    const assginRoles = useMutation({
        mutationKey: ['assgin-roles'],
        mutationFn: (body: Body) => userServices.assginRoles(body.userId, body.data),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (error.response?.status === 403) showBoundary(error);
            if (isAxiosBadRequestError(error)) openNotification('error', error.response?.data.message);
        },
    });
    const assginClaims = useMutation({
        mutationKey: ['assgin-claims'],
        mutationFn: (body: Body) => userServices.assginClaims(body.userId, body.data),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (error.response?.status === 403) showBoundary(error);
            if (isAxiosBadRequestError(error)) openNotification('error', error.response?.data.message);
        },
    });
    useEffect(() => {
        dispatch(loadRoles());
        if (user) {
            const key: string[] = [];
            user.claims.forEach((e) => {
                key.push(e.claimType);
            });
            setDepartmentKey(key);
            setRoleKey(user.roles as string[]);
        }
    }, [user, dispatch]);
    if (roles) {
        roles.forEach((e) => {
            const i = {
                label: e.name,
                value: e.name,
            };
            optionRoles.push(i);
        });
    }
    if (departments) {
        departments.forEach((e) => {
            const i = {
                label: e.name,
                value: e.id.toString(),
            };
            optionDepartment.push(i);
        });
    }
    const handleChangeSelect = (value: string[]) => {
        setRoleKey(value);
    };
    const handleChangeSelectDepartments = (value: string[]) => {
        setDepartmentKey(value);
    };
    const addRoles = () => {
        if (roleKey.length > 0 && user) {
            const body: Body = {
                userId: user.id,
                data: roleKey,
            };
            assginRoles.mutateAsync(body);
        }
    };
    const addClaims = () => {
        if (departmentKey.length > 0 && user) {
            const body: Body = {
                userId: user.id,
                data: departmentKey,
            };
            assginClaims.mutateAsync(body);
        }
    };
    return (
        <div>
            {contextHolder}
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    navigate(-1);
                }}
            >
                Quay lại
            </Button>
            {user ? (
                <>
                    <p className="mb-3">{user.fullName}</p>
                    <div className="mb-3">
                        <Select
                            mode="multiple"
                            onChange={handleChangeSelect}
                            placeholder="Please select"
                            value={roleKey}
                            style={{ width: '100%' }}
                            options={optionRoles}
                        />
                    </div>
                    <Button
                        loading={assginRoles.isPending}
                        type="primary"
                        onClick={() => {
                            addRoles();
                        }}
                    >
                        Cập nhật
                    </Button>
                </>
            ) : (
                <Skeleton />
            )}
            {user && user.roles.includes('customer') === false && (
                <>
                    <p className="my-3">Danh sách claim của user:</p>
                    <Select
                        mode="multiple"
                        onChange={handleChangeSelectDepartments}
                        placeholder="Please select"
                        disabled={!isAddClaims}
                        value={departmentKey}
                        style={{ width: '100%' }}
                        options={optionDepartment}
                    />
                    {!isAddClaims && (
                        <div className="mt-3">
                            <Button
                                onClick={() => {
                                    setIsAddClaims(!isAddClaims);
                                }}
                            >
                                + Thêm
                            </Button>
                        </div>
                    )}
                    {isAddClaims && (
                        <>
                            <Space className="mt-3">
                                <Button
                                    loading={assginClaims.isPending}
                                    type="primary"
                                    onClick={() => {
                                        addClaims();
                                    }}
                                >
                                    Cập nhật
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsAddClaims(!isAddClaims);
                                    }}
                                >
                                    Hủy
                                </Button>
                            </Space>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default UserEdit;
