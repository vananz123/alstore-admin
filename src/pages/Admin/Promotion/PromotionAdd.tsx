import React, { useEffect } from 'react';
import {  notification } from 'antd';
type NotificationType = 'success' | 'error';
import { StatusForm } from '@/type';
import { useNavigate } from 'react-router-dom';
import PromotionForm from '@/conponents/PromotionForm';
import { Promotion } from '@/api/ResType';
function PromotionAdd() {
    const [promotion, setPromotion] = React.useState<Promotion>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();
const Navigate =useNavigate()
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    useEffect(() => {
        if (status == 'success') {
            if (typeof promotion != 'undefined') {
                openNotificationWithIcon('success');
                Navigate('/admin/promotion')
            }
        }
        if (status == 'error') openNotificationWithIcon('error');
        setStatus('loading');
        setPromotion(undefined)
    }, [status]);

    return (
        <>
            {contextHolder}
            <PromotionForm promotion={promotion} onSetState={setPromotion} onSetStatus={setStatus} />
        </>
    );
}

export default PromotionAdd;
