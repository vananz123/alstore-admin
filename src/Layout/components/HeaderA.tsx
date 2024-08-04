/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge, Popover, Select, Space, Switch } from 'antd';
import { Layout, Avatar, Dropdown } from 'antd';
import { UserOutlined, MoonOutlined, SunOutlined, BellFilled, DownOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import type { MenuProps, SelectProps } from 'antd';
const { Header } = Layout;
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadUser } from '@/app/feature/user/action';
import { loadDepartment, changeDepartment } from '@/app/feature/department/action';
import { selectDepartment } from '@/app/feature/department/reducer';
import { useDebounce, useSkin } from '@/hooks';
import { useEffect } from 'react';
import Search, { SearchProps } from 'antd/es/input/Search';
import { useImmer } from 'use-immer';
import { LIST_NAV_DATA, NavType } from './data';
function HeaderA() {
    const Navigate = useNavigate();
    const loca = useLocation().pathname;
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
    const PlaneNavData: NavType[] = [];
    LIST_NAV_DATA.forEach((element) => {
        if (element.children) {
            element.children.forEach((e) => {
                PlaneNavData.push(e);
            });
        } else {
            PlaneNavData.push(element);
        }
    });
    const a = loca.split('/');
    const PageName = PlaneNavData.find(x => x.link === `/${a[1]}`)?.key
    const [searchData, setSearchData] = useImmer<NavType[]>([]);
    const [searchValue, setSearchValue] = useImmer('');
    const debounce = useDebounce({ value: searchValue, deplay: 100 });
    const onChangeInput: SearchProps['onChange'] = (value) => {
        setSearchValue(value.target.value);
    };
    const onSearch: SearchProps['onSearch'] = async (_, _e, info) => {
        if (info?.source == 'clear') {
            setSearchData([]);
        }
    };
    useEffect(() => {
        const Search = async () => {
            if (debounce != '' && debounce != undefined) {
                const data = PlaneNavData.filter(
                    (x) => x.key.toLowerCase().includes(debounce?.toString().toLowerCase()) === true,
                );

                setSearchData(data);
            }
        };
        Search();
    }, [debounce]);
    return (
        <Header
            style={{
                ...style,
                padding: 0,
                height: 64,
            }}
        >
            <div className="flex justify-between items-center px-3">
                <div className="flex gap-5">
                    <p className='text-[24px] w-[200px] font-bold'>{PageName}</p>
                    <div className="h-[64px] flex justify-start items-center">
                        <Popover
                            content={
                                <div className='w-[245px]'>
                                    {searchData? (
                                        <>
                                            {searchData.map((e) => (
                                                <div className="mb-2" key={e.key}>
                                                    <Link to={e.link} className="underline">
                                                        <p>{e.key}</p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>Not found</div>
                                    )}
                                </div>
                            }
                            title={'Tìm kiếm'}
                            trigger={'click'}
                            placement="bottom"
                        >
                            <Search
                                className="max-w-[600px]"
                                allowClear
                                enterButton={false}
                                placeholder="Từ khóa"
                                size="large"
                                onChange={onChangeInput}
                                onSearch={onSearch}
                            />
                        </Popover>
                    </div>
                </div>
                <Space size={'middle'}>
                    <Select
                        size='large'
                        onChange={onChangeDepartment}
                        value={selected}
                        options={options}
                    />
                    <Badge count={1} size="small">
                        <a>
                            <BellFilled />
                        </a>
                    </Badge>
                    <Switch
                        checked={skin == 'dark' ? true : false}
                        checkedChildren={<SunOutlined />}
                        unCheckedChildren={<MoonOutlined />}
                        onChange={onChange}
                    />
                    <Dropdown menu={{ items }} trigger={['hover']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar size={'small'} icon={<UserOutlined />} />
                                <div>
                                    {user?.userName} <DownOutlined />
                                </div>
                            </Space>
                        </a>
                    </Dropdown>
                </Space>
            </div>
        </Header>
    );
}

export default HeaderA;
