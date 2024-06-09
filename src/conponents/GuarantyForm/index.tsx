/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Select, InputNumber  } from 'antd';
import { Guaranty, StatusForm } from '@/type';
import * as guarantyServieces from '@/api/guarantyServices';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_STATUS, editorConfiguration } from '@/common/common';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { ArrowLeftOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
interface Props {
    guaranty: Guaranty | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}
const GuarantyForm: React.FC<Props> = ({ guaranty, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    const [value, setValue] = React.useState<string>('<p></p>');
    useEffect(() => {
        if (typeof guaranty !== 'undefined') setValue(guaranty?.description);
        form.setFieldsValue(guaranty);
    }, [form, guaranty]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Guaranty>['onFinish'] = async (values) => {
        setIsLoading(true);
        setContext('');
        if (guaranty != undefined) {
            if (guaranty?.id != undefined) {
                values.id = guaranty.id;
                values.description = value;
                const res = await guarantyServieces.updateGuaranty(values);
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
            const res = await guarantyServieces.createGuaranty(values);
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

    const onFinishFailed: FormProps<Guaranty>['onFinishFailed'] = (errorInfo) => {
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
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default GuarantyForm;
