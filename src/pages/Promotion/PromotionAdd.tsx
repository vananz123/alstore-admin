import {  FormProps} from 'antd';
import { useNavigate } from 'react-router-dom';
import PromotionForm from '@/conponents/PromotionForm';
import { Promotion, Result } from '@/api/ResType';
import useNotification from '@/hooks/useNotification';
import { useMutation } from '@tanstack/react-query';
import {CreatePromotion} from '@/api/promotionServices'
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import GoBack from '@/conponents/GoBack';
function PromotionAdd() {
    const {contextHolder,openNotification}  =useNotification()
    const navigate = useNavigate()
    const create = useMutation({
        mutationKey: ['create-promotion'],
        mutationFn: (values: Promotion) => CreatePromotion(values),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                navigate('/promotion');
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
        if(values) create.mutateAsync(values)
    };
    const onFinishFailed: FormProps<Promotion>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <GoBack/>
            <PromotionForm data={undefined} isLoading={create.isPending} onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </>
    );
}

export default PromotionAdd;
