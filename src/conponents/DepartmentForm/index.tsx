import { Department, StatusForm } from "@/type";
import { Button, Form, FormProps, Input, InputNumber, Select } from "antd";
import React, { SetStateAction, useEffect } from "react";
import * as departmentServices from '@/api/departmentServices';
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FORM_ITEM_LAYOUT, OPTIONS_STATUS, TAIL_FORM_ITEM_LAYOUT, editorConfiguration } from "@/common/common";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";



interface Props {
    department: Department | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}
const DepartmentForm: React.FC<Props> = ({ department, onSetState,onSetStatus }) => {
    const [form] = Form.useForm();
    const [value,setValue] = React.useState<string>('<p></p>');
    useEffect(() => {
        if (typeof department !== 'undefined') setValue(department?.description);
        form.setFieldsValue(department);
    }, [form, department]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Department>['onFinish'] = async (values) => {
        setIsLoading(true);
        setContext('');
        if (department != undefined) {
            if (department?.id != undefined) {
                values.id = department.id;
                values.description = value;
                const res = await departmentServices.updateDepartment(values);
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
            values.description = value;
            const res = await departmentServices.createDepartment(values);
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
    const onFinishFailed: FormProps<Department>['onFinishFailed'] = (errorInfo) => {
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
                    //valuePropName='name'
                    //initialValue={promotion?.name}
                    rules={[{ required: true, message: 'Please input department name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="description"
                    label="Mô tả chi nhánh"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input department description!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Department>
                    name="phoneNumber"
                    label="SĐT"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input department sdt!' }]}
                >
                    <InputNumber max={36} min={0} type="number" />
                </Form.Item>
                <Form.Item label="Thông tin" tooltip="What do you want others to call you?">
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={value || '<p></p>'}
                        // onReady={(editor) => {
                        //     // You can store the "editor" and use when it is needed.
                        //     console.log('Editor is ready to use!', editor);
                        // }}
                        onChange={(_, editor) => {
                            setValue(editor.getData());
                        }}
                        // onBlur={(event, editor) => {
                        //     console.log('Blur.', editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     console.log('Focus.', editor);
                        // }}
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
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default DepartmentForm;