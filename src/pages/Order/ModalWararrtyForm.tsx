/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderDetail, Warranty } from '@/api/ResType';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { SetStateAction, useEffect } from 'react';
import * as warrantyServices from '@/api/warrantyServices';
type NotificationType = 'success' | 'error';
interface Props {
    open: boolean;
    setOpen: SetStateAction<any>;
    orderDetail: OrderDetail | undefined;
    warranty:Warranty | undefined;
    refresh: () => void;
}
const ModalWararrtyForm: React.FC<Props> = ({ open, setOpen, orderDetail , warranty ,refresh}) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const createWarranty = useMutation({
        mutationKey: ['create-warranty'],
        mutationFn: (body: Warranty) => warrantyServices.create(body),
        onSuccess:(data)=>{
            if( data.isSuccessed === true){
                refresh()
                setOpen(false)
                openNotificationWithIcon('success', 'thành công')
            }else{
                openNotificationWithIcon('error', data.message)
            }
        }
    });
    const updateWarranty = useMutation({
        mutationKey: ['update-warranty'],
        mutationFn: (body: Warranty) => warrantyServices.update(body),
        onSuccess:(data)=>{
            if( data.isSuccessed === true){
                refresh()
                setOpen(false)
                openNotificationWithIcon('success', 'thành công')
            }else{
                openNotificationWithIcon('error', data.message)
            }
        }
    });
    const [value, setValue] = React.useState<string | undefined>('');
    useEffect(()=>{
        if(warranty){
            setValue(warranty.description)
        }
    },[warranty])
    console.log(warranty)
    const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    const save = async() => {
        if (!warranty && orderDetail && value) {
            const w: Warranty = {
                orderDetailId: orderDetail.id,
                description: value,
                isCanceledButton: false,
                isSuccessedButton: false,
                status: 0,
                id: 0,
                dateCreated: '',
            };
            createWarranty.mutateAsync(w);
        }
        if(warranty && orderDetail && value){
            const w: Warranty = {
                orderDetailId: orderDetail.id,
                description: value,
                isCanceledButton: false,
                isSuccessedButton: false,
                status: 0,
                id: warranty.id,
                dateCreated: '',
            };
            updateWarranty.mutateAsync(w);
        }
    };
    return (
        <div>
            {contextHolder}
            <Modal title="Form" open={open} onCancel={() => setOpen(false)} footer="">
                <TextArea
                    value={value}
                    onChange={changeValue}
                    placeholder="something..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
                <Button type="primary" loading={createWarranty.isPending} onClick={() => save()} size="large">
                    Save
                </Button>
            </Modal>
        </div>
    );
};

export default ModalWararrtyForm;
