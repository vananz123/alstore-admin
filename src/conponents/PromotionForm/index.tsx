/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { ConponentFormProps } from '@/type';
import { Promotion } from '@/api/ResType';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_PROMOTION_TYPE } from '@/common/common';
const { RangePicker } = DatePicker;
import type { GetProps } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current <= dayjs().endOf('day');
};
const PromotionForm: React.FC<ConponentFormProps<Promotion>> = ({ data, isLoading, onFinish, onFinishFailed }) => {
    const [form] = Form.useForm();
    if (data) form.setFieldsValue(data);
    return (
        <>
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
                    <RangePicker disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default PromotionForm;
