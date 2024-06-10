import React, { useEffect } from 'react';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import { StatusForm } from '@/type';
import { useNavigate } from 'react-router-dom';
import { Guaranty } from '@/type';
import GuarantyForm from '@/conponents/GuarantyForm';
function GuarantiesAdd() {
    const [guaranty, setGuaranty] = React.useState<Guaranty>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();
    const Navigate = useNavigate();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    useEffect(() => {
        if (status == 'success') {
            if (guaranty != undefined) {
                openNotificationWithIcon('success');
                Navigate('/guaranties');
            }
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading');
        setGuaranty(undefined);
    }, [status]);

    return (
        <>
            {contextHolder}
            <GuarantyForm guaranty={guaranty} onSetState={setGuaranty} onSetStatus={setStatus} />
        </>
    );
}

export default GuarantiesAdd;
