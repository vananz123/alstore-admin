import CategoryForm from '@/conponents/CategoryForm';
import React, { useEffect } from 'react';
import {  notification } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/type';
type NotificationType = 'success' | 'error';
import { useParams } from 'react-router-dom';
import { StatusForm } from '@/type';
function CategoryEdit() {
    const { id } = useParams();
    const [category, setCategory] = React.useState<Category>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess update!' : 'error',
        });
    };
    useEffect(() => {
        if(id != undefined && status == 'loading'){
            const getCate = async () => {
                const res = await categoryServices.getCateById(id);
                if (res.isSuccessed == true) {
                    setCategory(res.resultObj);
                }
            };
            getCate()
        }
        if (status == 'success') {
            if (category != undefined) {
                openNotificationWithIcon('success');
            }
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading')
    }, [status,id]);

    return (
        <>
            {contextHolder}
            <CategoryForm category={category} onSetState={setCategory} onSetStatus={setStatus} />
        </>
    );
}

export default CategoryEdit;
