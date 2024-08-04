import DepartmentForm from '@/conponents/DepartmentForm';
import { Department } from '@/type';
import { useMutation } from '@tanstack/react-query';
import { FormProps } from 'antd';
import { createDepartment } from '@/api/departmentServices';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { useNavigate } from 'react-router-dom';
import GoBack from '@/conponents/GoBack';
function DepartmentAdd() {
    const { contextHolder, openNotification } = useNotification();
    const navigate = useNavigate();
    const mutationCreate = useMutation({
        mutationKey: ['create-category'],
        mutationFn: (values: Department) => createDepartment(values),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                navigate('/department');
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (error.response?.status === 403) {
                //
            } else {
                openNotification('success', error.response?.data.message);
            }
        },
    });
    const onFinish: FormProps<Department>['onFinish'] = async (values) => {
        mutationCreate.mutateAsync(values);
    };
    const onFinishFailed: FormProps<Department>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <GoBack/>
            <DepartmentForm data={undefined} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </>
    );
}
export default DepartmentAdd;
