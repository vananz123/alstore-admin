/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { FORM_ITEM_LAYOUT, OPTIONS_STATUS, TAIL_FORM_ITEM_LAYOUT, editorConfiguration } from '@/common/common';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { ConponentFormProps ,Department} from '@/type';
const DepartmentForm: React.FC<ConponentFormProps<Department>> = ({
    data,
    isLoading,
    onFinish,
    onFinishFailed,
}) => {
    const [form] = Form.useForm<Department>();
    if (data) {
        form.setFieldsValue(data);
    }
    return (
        <>
            <Form
                {...FORM_ITEM_LAYOUT}
                form={form}
                name="departmentForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 1000 }}
                scrollToFirstError
            >
                <Form.Item<Department>
                    name="name"
                    label="Tên chi nhánh"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input department name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="address"
                    label="Địa chỉ"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input department address!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="linkGoogleMap"
                    label="Link"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input department address!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="urbanDistrict"
                    label="Quận/ huyện"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input department urbanDistrict!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="province"
                    label="Tĩnh/ TP"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input department province!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="phoneNumber"
                    label="SĐT"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, max: 10, message: 'Please input department sdt!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name={'description'}
                    label="Mô tả chi nhánh"
                    tooltip="What do you want others to call you?"
                >
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={form.getFieldValue('description') || '<p></p>'}
                        onChange={(_, editor) => {
                            form.setFieldValue('description', editor.getData());
                        }}
                    />
                </Form.Item>
                <Form.Item<Department>
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
export default DepartmentForm;
