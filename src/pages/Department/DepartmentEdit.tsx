import * as departmentServices from '@/api/departmentServices'
import DepartmentForm from '@/conponents/DepartmentForm';
import { Department, StatusForm } from '@/type';
import { notification } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
type NotificationType = 'success' | 'error';

function DepartmentEdit(){
    const { id } = useParams();
    const [department, setDepartment] = React.useState<Department>();
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
            const getGuaranty = async () => {
                const res = await departmentServices.getDepartmentById(Number(id));
                if (res.isSuccessed == true) {
                    setDepartment(res.resultObj);
                }
            };
            getGuaranty()
        }
        if (status == 'success') {
            if (typeof department !== 'undefined') openNotificationWithIcon('success');
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading')
    }, [status]);
    return (
        <>
            {contextHolder}
            <DepartmentForm department={department} onSetState={setDepartment} onSetStatus={setStatus} />
        </>
    );
}
export default DepartmentEdit;