import CategoryForm from '@/conponents/CategoryForm';
import { getCateById } from '@/api/categoryServices';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Skeleton } from 'antd';

import { updateCate } from '@/api/categoryServices';
import useNotification from '@/hooks/useNotification';
import { Category } from '@/type';
import { FormProps } from 'antd';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import GoBack from '@/conponents/GoBack';
function CategoryEdit() {
    const { id } = useParams();
    const { contextHolder, openNotification } = useNotification();
    const { data: category, refetch } = useQuery({
        queryKey: ['load-category', id],
        queryFn: () => getCateById(Number(id)).then((data) => data.resultObj),
        enabled: !!id,
    });
    const update = useMutation({
        mutationKey: ['update-category', category?.id],
        mutationFn: (values: Category) => updateCate(values),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
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
        if (category != undefined) {
            if (category?.id != undefined) {
                values.id = category.id;
                update.mutateAsync(values);
            }
        }
    };
    const onFinishFailed: FormProps<Category>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <GoBack/>
            {category ? (
                <CategoryForm
                    data={category}
                    isLoading={update.isPending}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                />
            ) : (
                <Skeleton />
            )}
        </>
    );
}

export default CategoryEdit;
