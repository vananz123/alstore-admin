import * as promotionServices from '@/api/promotionServices';
import React, { useEffect } from 'react';
import { notification, Skeleton } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
type NotificationType = 'success' | 'error';
import { useParams } from 'react-router-dom';
import { StatusForm } from '@/type';
import { Promotion } from '@/api/ResType';
import PromotionForm from '@/conponents/PromotionForm';
function PromotionEdit() {
    const { id } = useParams();
    const [promotion, setPromotion] = React.useState<Promotion>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess update!' : 'error',
        });
    };
    useEffect(() => {
        if (id != undefined && status == 'loading') {
            const getPromotion = async () => {
                const res = await promotionServices.getById(Number(id));
                if (res.isSuccessed === true) {
                    const arr: Dayjs[] = [];

                    arr.push(dayjs(res.resultObj?.startDate));
                    arr.push(dayjs(res.resultObj?.endDate));
                    res.resultObj.arrDate = arr;
                    console.log(res.resultObj);
                    setPromotion(res.resultObj);
                }
            };
            getPromotion();
        }
        if (status == 'success') {
            if (typeof promotion !== 'undefined') openNotificationWithIcon('success');
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
    }, [status]);

    return (
        <>
            {contextHolder}
            {typeof promotion !== 'undefined' ? (
                <PromotionForm promotion={promotion} onSetState={setPromotion} onSetStatus={setStatus} />
            ) : (
                <Skeleton />
            )}
        </>
    );
}

export default PromotionEdit;
