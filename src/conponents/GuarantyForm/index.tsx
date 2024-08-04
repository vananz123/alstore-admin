/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import { Guaranty } from '@/type';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_STATUS, editorConfiguration } from '@/common/common';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { ConponentFormProps } from '@/type';
const GuarantyForm: React.FC<ConponentFormProps<Guaranty>> = ({ data, isLoading, onFinish, onFinishFailed }) => {
    const [form] = Form.useForm();
    if (data) form.setFieldsValue(data);
    return (
        <>
            <Form
                {...FORM_ITEM_LAYOUT}
                form={form}
                name="guarantyForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 1000 }}
                scrollToFirstError
            >
                <Form.Item<Guaranty>
                    name="name"
                    label="Tên bảo hành"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.name}
                    rules={[{ required: true, message: 'Please input guaranty name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="sku"
                    label="Loại bảo hành"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input guaranty name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="period"
                    label="Thời hạn"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input guaranty name!' }]}
                >
                    <InputNumber max={36} min={0} type="number" />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="description"
                    label="Thông tin"
                    tooltip="What do you want others to call you?"
                >
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={form.getFieldValue('description') || '<p></p>'}
                        // onReady={(editor) => {
                        //     // You can store the "editor" and use when it is needed.
                        //     console.log('Editor is ready to use!', editor);
                        // }}
                        onChange={(_, editor) => {
                            form.setFieldValue('description', editor.getData());
                        }}
                        // onBlur={(event, editor) => {
                        //     console.log('Blur.', editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     console.log('Focus.', editor);
                        // }}
                    />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="status"
                    label="Trạng thái"
                    initialValue={0}
                    rules={[{ required: true, message: 'Please select Status!' }]}
                >
                    <Select size={'middle'} style={{ width: 200 }} options={OPTIONS_STATUS} />
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
export default GuarantyForm;
