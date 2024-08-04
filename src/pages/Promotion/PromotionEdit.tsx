import { FormProps, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import PromotionForm from '@/conponents/PromotionForm';
import { Promotion, Result } from '@/api/ResType';
import useNotification from '@/hooks/useNotification';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UpdatePromotion, getById } from '@/api/promotionServices';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import GoBack from '@/conponents/GoBack';
function PromotionEdit() {
    const { id } = useParams();
    const { contextHolder, openNotification } = useNotification();
    const { data, refetch } = useQuery({
        queryKey: ['load-promotion', id],
        queryFn: () =>
            getById(Number(id)).then((data) => {
                const arr: Dayjs[] = [];
                const dataN = data.resultObj;
                arr.push(dayjs(data.resultObj.startDate));
                arr.push(dayjs(data.resultObj.endDate));
                dataN.arrDate = arr;
                return dataN;
            }),
        enabled: !!id,
    });
    const update = useMutation({
        mutationKey: ['update-promotion'],
        mutationFn: (values: Promotion) => UpdatePromotion(values),
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
    const onFinish: FormProps<Promotion>['onFinish'] = async (values) => {
        values.startDate = dayjs(values.arrDate[0]).format();
        values.endDate = dayjs(values.arrDate[1]).format();
        if (values && data) {
            values.id = data?.id;
            update.mutateAsync(values);
        }
    };
    const onFinishFailed: FormProps<Promotion>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <GoBack />
            {data? (
                <PromotionForm
                    data={data}
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

export default PromotionEdit;
