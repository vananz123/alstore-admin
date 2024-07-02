import { getDepartmentById } from '@/api/departmentServices';
import DepartmentForm from '@/conponents/DepartmentForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormProps, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { updateDepartment } from '@/api/departmentServices';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { Department } from '@/type';
import {  isAxiosBadRequestError, isAxiosUnauthoriedError } from "@/utils/utils";
import { useErrorBoundary } from 'react-error-boundary';
import GoBack from '@/conponents/GoBack';
function DepartmentEdit() {
    const { id } = useParams();
    const { data: department, refetch } = useQuery({
        queryKey: ['load-department', id],
        queryFn: () => getDepartmentById(Number(id)).then((data) => data.resultObj),
        enabled: !!id,
    });
    const { contextHolder, openNotification } = useNotification();
    const {showBoundary}= useErrorBoundary()
    const mutationUpdate = useMutation({
        mutationKey: ['update-category', department?.id],
        mutationFn: (values: Department) => updateDepartment(values),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (isAxiosUnauthoriedError(error)) showBoundary(error);
            if (isAxiosBadRequestError(error)) openNotification('error', error.response?.data.message);
        },
    });
    const onFinish: FormProps<Department>['onFinish'] = async (values) => {
        if (department != undefined) {
            if (department?.id != undefined) {
                values.id = department.id;
                mutationUpdate.mutateAsync(values);
            }
        }
    };
    const onFinishFailed: FormProps<Department>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <GoBack/>
            {department ? (
                <DepartmentForm
                    data={department}
                    isLoading={mutationUpdate.isPending}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                />
            ) : (
                <Skeleton />
            )}
        </>
    );
}
export default DepartmentEdit;
