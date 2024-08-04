import { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Guaranty } from '@/type';
import GuarantyForm from '@/conponents/GuarantyForm';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { createGuaranty } from '@/api/guarantyServices';
import useNotification from '@/hooks/useNotification';
import { useMutation } from '@tanstack/react-query';
import GoBack from '@/conponents/GoBack';
function GuarantiesAdd() {
    const { contextHolder, openNotification } = useNotification();
    const navigate = useNavigate();
    const create = useMutation({
        mutationKey: ['create-category'],
        mutationFn: (values: Guaranty) => createGuaranty(values),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                navigate('/guaranty');
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
    const onFinish: FormProps<Guaranty>['onFinish'] = async (values) => {
        create.mutateAsync(values);
    };

    const onFinishFailed: FormProps<Guaranty>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <GoBack/>
            <GuarantyForm
                data={undefined}
                isLoading={create.isPending}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </>
    );
}

export default GuarantiesAdd;
