/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Switch } from 'antd';
import { Layout, Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import type { MenuProps } from 'antd';
const { Header } = Layout;
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import { loadUser } from '@/app/feature/user/action';
import { useSkin } from '@/hooks';
function HeaderA() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser).data;
    const { style, skin, setSkin } = useSkin();
    const dispatch = useAppDispatch();
    const items: MenuProps['items'] = [
        {
            label: <Link to={'/admin/profile'}>Setting</Link>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a
                    onClick={() => {
                        Logout();
                    }}
                >
                    Logout
                </a>
            ),
            key: '3',
        },
    ];
    const Logout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken != null) {
            localStorage.removeItem('accessToken');
            dispatch(loadUser());
            Navigate('/auth/login-admin');
        }
    };
    const onChange = (check: boolean) => {
        setSkin(!check ? 'light' : 'dark');
    };
    return (
        <Header
            style={{
                ...style,
                padding: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
            }}
        >
            <Switch
                checked={skin == 'dark' ? true : false}
                checkedChildren="light"
                unCheckedChildren="dark"
                onChange={onChange}
                style={{marginRight:10}}
            />
            <Dropdown menu={{ items }} trigger={['hover']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar size="large" icon={<UserOutlined />} />
                        <div>{user?.userName}</div>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    );
}

export default HeaderA;
