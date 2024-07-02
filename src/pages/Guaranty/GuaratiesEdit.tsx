import { useParams } from 'react-router-dom';
import { Guaranty } from '@/type';
import GuarantyForm from '@/conponents/GuarantyForm';
import { getGuarantyById, updateGuaranty } from '@/api/guarantyServices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import useNotification from '@/hooks/useNotification';
import { FormProps } from 'antd';
import GoBack from '@/conponents/GoBack';
function GuarantiesEdit() {
    const { id } = useParams();
    const { data, refetch } = useQuery({
        queryKey: ['load-guaranty', id],
        queryFn: () => getGuarantyById(Number(id)).then((data) => data.resultObj),
        enabled: !!id,
    });
    const { contextHolder, openNotification } = useNotification();
    const update = useMutation({
        mutationKey: ['update-category'],
        mutationFn: (values: Guaranty) => updateGuaranty(values),
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
    const onFinish: FormProps<Guaranty>['onFinish'] = async (values) => {
        if (data != undefined) {
            if (data.id != undefined) {
                values.id = data.id;
                update.mutateAsync(values);
            }
        }
    };
    const onFinishFailed: FormProps<Guaranty>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <GoBack/>
            <GuarantyForm
                data={data}
                isLoading={update.isPending}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </>
    );
}

export default GuarantiesEdit;
