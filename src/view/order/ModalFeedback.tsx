/* eslint-disable @typescript-eslint/no-explicit-any */
import { Review } from '@/api/ResType';
import React, { SetStateAction } from 'react';
import { Card, Modal, Rate, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import * as reviewServices from '@/api/reviewServices'
type NotificationType = 'success' | 'error';
interface Props {
    review: Review | undefined;
    openModalFb: boolean;
    setOpenModalFb: SetStateAction<any>;
}
const ModalFeedback: React.FC<Props> = ({ review, openModalFb, setOpenModalFb }) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const [value, setValue] = React.useState<string | undefined>(review?.feelback);
    const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    const handleOk =async()=>{
        console.log(value)
        if(value != '' && value != undefined && review?.id != undefined){
            setConfirmLoading(true)
            const res = await reviewServices.feedback(review?.id, value)
            if(res.isSuccessed === true){
                openNotificationWithIcon('success','feedback succuss!')
            }else{
                openNotificationWithIcon('error',res.message)
            }
            setConfirmLoading(false)

        }
    }
    return (
        <div>
            {contextHolder}
            <Modal
                title="Feedback"
                confirmLoading={confirmLoading}
                open={openModalFb}
                onCancel={() => {
                    setOpenModalFb(false);
                }}
                onOk={()=>{handleOk()}}
            >
                <Card size="small" title="Review">
                    <div style={{ marginBottom: 10 }}>
                        <p>{review?.comment || ''}</p>
                        <Rate value={review?.rate} />
                    </div>
                </Card>
                <p style={{ marginTop: 10, marginBottom: 10 }}>Feedback</p>
                <TextArea
                    value={value}
                    onChange={changeValue}
                    
                    placeholder="something..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </Modal>
        </div>
    );
};

export default ModalFeedback;
