import CategoryForm from '@/conponents/CategoryForm';
import { useMutation } from '@tanstack/react-query';
import { createCate } from '@/api/categoryServices';
import useNotification from '@/hooks/useNotification';
import { Category } from '@/type';
import { FormProps } from 'antd';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { useNavigate } from 'react-router-dom';
import GoBack from '@/conponents/GoBack';
function CategoryAdd() {
    const { contextHolder, openNotification } = useNotification();
    const navigate = useNavigate();
    const create = useMutation({
        mutationKey: ['create-category'],
        mutationFn: (values: Category) => createCate(values),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                navigate('/category');
                openNotification('success', data.message);
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
    const onFinish: FormProps<Category>['onFinish'] = async (values) => {
        create.mutateAsync(values);
    };

    const onFinishFailed: FormProps<Category>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <GoBack/>
            <CategoryForm
                data={undefined}
                isLoading={create.isPending}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </>
    );
}

export default CategoryAdd;
