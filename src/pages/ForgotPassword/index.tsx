import queryString from 'query-string';
import * as userServices from '@/api/userServices';
import { Button, Form, type FormProps, Input, message } from 'antd';
import { RegisterUser } from '../Register';
import { useNavigate } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
function ForgotPassword() {
    const p = queryString.parse(window.location.search);
    const Navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<RegisterUser>['onFinish'] = async (values) => {
        if (
            values.confirmPassword != undefined &&
            values.password &&
            typeof p.token === 'string' &&
            typeof p.email === 'string'
        ) {
            const res = await userServices.resetPass(p.token.replace(/ /g, '+'), p.email, values.password);
            if (res.isSuccessed == true) {
                messageApi.open({
                    type: 'success',
                    content: res.resultObj,
                });
                Navigate('/auth/login');
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.message,
                });
            }
        }
    };
    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
        >
            <Form
                name="basic"
                style={{ maxWidth: 600, width: 350, maxHeight: 500, marginTop: '15px' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="large"
            >
                <Form.Item<RegisterUser>
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password minLength={6} placeholder="New password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {contextHolder}
        </div>
    );
}

export default ForgotPassword;
