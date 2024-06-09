/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@/type';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Modal, Upload, UploadFile, UploadProps, notification } from 'antd';
type NotificationType = 'success' | 'error';
import React, { SetStateAction, useEffect } from 'react';
import * as productServices from '@/api/productServices';
interface Props {
    product?: Product;
    open:boolean;
    setOpen :SetStateAction<any>;
}
interface ProductFile {
    photo: UploadFile[];
}
const UploadImages: React.FC<Props> = ({ product,open,setOpen }) => {
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [form] = Form.useForm<ProductFile>();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    useEffect(() => {
        if (product) {
            const arr: string[] = product.urlImage.split('*');
            const file: UploadFile[] = [];
            arr.map((url) => {
                if (url != '' && url != '*') {
                    const item: UploadFile = {
                        uid: `${Math.random()}`,
                        name: url,
                        status: 'done',
                        url: baseUrl + url,
                    };
                    file.push(item);
                }
            });
            form.setFieldsValue({ photo: file });
        }
    }, [form, product, baseUrl]);
    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        console.log(fileList);
        const newFileList = fileList.filter((file) => file.status === 'done');
        setFileList(newFileList);
    };
    const handlePreview = async (file: UploadFile) => {
        const urlImage = file.url ? file.url : URL.createObjectURL(file.originFileObj as File);
        setPreviewImage(urlImage);
        setPreviewOpen(true);
    };
    const handleDrop = async (file: any) => {
        if (product) {
           await productServices.deleteImage(product.id, file.name);
        }
    };
    const updateImage = async (id: number, e: UploadFile) => {
        const res = await productServices.updateImage(id, e);
        return res;
    };
    const onFinishUploadImages = async (values: ProductFile) => {
        if (product != undefined) {
            if ((product.urlImage == '' || product.urlImage == '*') && values.photo.length > 0) {
                const res = await productServices.uploadImage(product.id, values.photo);
                console.log(res);
                if (res.isSuccessed == true) {
                    openNotificationWithIcon('success', 'Add Image success');
                }
            }
            if (product.urlImage != '' && product.urlImage != '*' && values.photo.length > 0) {
                values.photo.forEach((e: UploadFile) => {
                    if (e.originFileObj) {
                        updateImage(product.id, e);
                    }
                });
                openNotificationWithIcon('success', 'Edit Image success');
            }
        }
    };
    return (
        <div>
            {contextHolder}
            
            <Drawer title="Upload image" onClose={()=>{setOpen()}} open={open}>
                <Form
                    form={form}
    
                    name="dynamic_form_nest_item"
                    onFinish={onFinishUploadImages}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item
                        name="photo"
                        
                        valuePropName="fileList"
                        rules={[{ required: true, message: 'Please upload least 1 image' }]}
                        getValueFromEvent={(event) => {
                            return event.fileList;
                        }}
                    >
                        <Upload
                            listType="picture-card"
                            accept=".png,.webp"
                            maxCount={5}
                            customRequest={({ onSuccess }) => {
                                if (onSuccess) {
                                    onSuccess('ok');
                                }
                            }}
                            fileList={fileList}
                            onChange={handleChange}
                            onPreview={handlePreview}
                            onRemove={handleDrop}
                        >
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Modal
                        open={previewOpen}
                        footer={null}
                        onCancel={() => {
                            setPreviewOpen(false);
                        }}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};
export default UploadImages;
