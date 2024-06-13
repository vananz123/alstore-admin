/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select, Space, Switch } from 'antd';
import { Layout, Avatar, Dropdown } from 'antd';
import { UserOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import type { MenuProps, SelectProps } from 'antd';
const { Header } = Layout;
import { Link, useNavigate } from 'react-router-dom';
import { loadUser } from '@/app/feature/user/action';
import { loadDepartment, changeDepartment } from '@/app/feature/department/action';
import { selectDepartment } from '@/app/feature/department/reducer';
import { useSkin } from '@/hooks';
import { useEffect } from 'react';
import Nav from './Nav';
import Logo from '/logo.png';
function HeaderA() {
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser).data;
    const { selected, data: department } = useAppSelector(selectDepartment);
    const { style, skin, setSkin } = useSkin();
    const options: SelectProps['options'] = [];
    useEffect(() => {
        dispatch(loadDepartment());
    }, [dispatch]);
    if (department) {
        department.map((e) => {
            const i = {
                label: <p className="text-base">{e.name}</p>,
                value: e.id,
            };
            options.push(i);
        });
    }
    const items: MenuProps['items'] = [
        {
            label: <Link to={'/profile'}>Setting</Link>,
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
            Navigate('/auth/login');
        }
    };
    const onChange = (check: boolean) => {
        setSkin(!check ? 'light' : 'dark');
    };
    const onChangeDepartment = (value: number) => {
        dispatch(changeDepartment(value));
    };
    return (
        <Header
            style={{
                ...style,
                padding: 0,
                height: 128,
            }}
        >
            <div className="flex justify-between items-center px-3">
                <div className="w-[64px]">
                    <img className="w-full h-full" src={Logo} alt="la store" />
                </div>
                <Space>
                    <Select
                        className="w-[300px] h-[50px]"
                        onChange={onChangeDepartment}
                        value={selected}
                        options={options}
                    />
                    <Switch
                        checked={skin == 'dark' ? true : false}
                        checkedChildren={<SunOutlined />}
                        unCheckedChildren={<MoonOutlined />}
                        onChange={onChange}
                        style={{ marginRight: 10 }}
                    />
                    <Dropdown menu={{ items }} trigger={['hover']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <div>{user?.userName}</div>
                                <Avatar size={'small'} icon={<UserOutlined />} />
                            </Space>
                        </a>
                    </Dropdown>
                </Space>
            </div>
            <Nav />
        </Header>
    );
}

export default HeaderA;
