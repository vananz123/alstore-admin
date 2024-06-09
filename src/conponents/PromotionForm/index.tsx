/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import * as promotionServices from '@/api/promotionServices';
import dayjs from 'dayjs';
import { StatusForm } from '@/type';
import { Promotion } from '@/api/ResType';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_PROMOTION_TYPE } from '@/common/common';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const PromotionForm: React.FC<{
    promotion: Promotion | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}> = ({ promotion, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    
    useEffect(()=>{
        form.setFieldsValue(promotion);
    },[form,promotion])
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Promotion>['onFinish'] = async (values) => {
        values.startDate = dayjs(values.arrDate[0]).format();
        values.endDate = dayjs(values.arrDate[1]).format();
        setIsLoading(true);
        setContext('');
        if (promotion != undefined) {
            values.id = promotion?.id;
            if (promotion?.id != undefined) {
                const res = await promotionServices.UpdatePromotion(values);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    const status: StatusForm = 'success';
                    onSetStatus(status);
                } else {
                    const status: StatusForm = 'error';
                    onSetStatus(status);
                }
            }
            setIsLoading(false);
            setContext('Save');
        } else {
            const res = await promotionServices.CreatePromotion(values);
            if (res.isSuccessed === true) {
                onSetState(res.resultObj);
                const status: StatusForm = 'success';
                onSetStatus(status);
            } else {
                const status: StatusForm = 'error';
                onSetStatus(status);
            }
            setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps<Promotion>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const navigate = useNavigate();

    return (
        <>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    navigate(-1);
                }}
            >
                Quay lại
            </Button>
            <Form
                {...FORM_ITEM_LAYOUT}
                form={form}
                name="promotionForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item<Promotion>
                    name="name"
                    label="Tên"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.name}
                    rules={[{ required: true, message: 'Please input promotion name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="description"
                    label="Mô Tả"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input promotion decription!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="value"
                    label="Giá trị"
                    tooltip="What do you want others to call you?"
                    dependencies={['type']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('type') === 'percentage') {
                                    if (value > 100) {
                                        return Promise.reject(new Error('The new type that you entered do not match!'));
                                    } else return Promise.resolve();
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item<Promotion>
                    name="type"
                    label="Loại KM"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    initialValue={'fixed'}
                    rules={[{ required: true, message: 'Please input type Discount !' }]}
                >
                    <Select
                        size={'middle'}
                        //onChange={handleChange}
                        style={{ width: 150 }}
                        options={OPTIONS_PROMOTION_TYPE}
                        maxCount={1}
                    />
                </Form.Item>
                <Form.Item
                    name={'arrDate'}
                    label="Ngày"
                    //initialValue={promotion?.arrDate}
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <RangePicker />
                </Form.Item>
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default PromotionForm;
