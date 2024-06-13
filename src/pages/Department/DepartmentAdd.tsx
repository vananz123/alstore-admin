import { Department, StatusForm } from "@/type";
import { notification } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type NotificationType = 'success' | 'error';
import DepartmentForm from "@/conponents/DepartmentForm";

function DepartmentAdd(){
    const [department, setDepartment] = React.useState<Department>();
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
            if (department != undefined) {
                openNotificationWithIcon('success');
                Navigate('/department');
            }
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading');
        setDepartment(undefined);
    }, [status]);
    return (
        <>
            {contextHolder}
            <DepartmentForm department={department} onSetState={setDepartment} onSetStatus={setStatus} />
        </>
    );
}
export default DepartmentAdd;