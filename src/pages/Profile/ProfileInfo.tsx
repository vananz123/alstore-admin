import { ResponseUser } from '@/api/ResType';
import UserForm from '@/conponents/UserForm';
import { StatusForm } from '@/type';
import { EditOutlined } from '@ant-design/icons';
import {  notification } from 'antd';
type NotificationType = 'success' | 'error';
import { Button, Descriptions, DescriptionsProps, Modal } from 'antd';
import React, { useCallback, useEffect } from 'react';
interface Props {
    user: ResponseUser;
}
const ProfileInfo: React.FC<Props> = React.memo( ({ user }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [statusForm , setStatusForm] = React.useState<StatusForm>('loading')
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = useCallback((type: NotificationType, mess:string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    },[api]);
    useEffect(()=>{
        if(statusForm === 'success') openNotificationWithIcon('success',"Cập nhật thành công!")
        if(statusForm ==='error') openNotificationWithIcon('error',"Cập nhật không thành công!")
    },[statusForm,openNotificationWithIcon])
    const desUser: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: <p>{user?.fullName}</p>,
            span: 2,
        },
        {
            key: '2',
            label: 'Email',
            children: <p>{user?.email}</p>,
        },
        {
            key: '3',
            label: 'Phone number',
            children: <p>{user?.phoneNumber}</p>,
        },
    ];
    return (
        <div>
            {contextHolder}
            <div className='flex justify-between mb-2'>
                <p className='text-[14px] text-base font-bold'>Thông tin tài khoản</p>
                <div>
                <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setOpen(true);
                        }}
                    ></Button>
                </div>
            </div>
            <Descriptions
                size="middle"
                items={desUser}
                bordered
            />
            <Modal
                title="Thông tin người dùng"
                open={open}
                onCancel={() => {
                    setOpen(false);
                }}
                footer={''}
            >
                <UserForm user={user}  onSetState={setStatusForm}/>
            </Modal>
        </div>
    );
});

export default ProfileInfo;
