import { Button, Input, Modal, Select, Space, Table, Tabs } from 'antd';
import type { InputRef, TableColumnType, TableColumnsType } from 'antd';
import React, { useCallback, useEffect } from 'react';
import * as userServices from '@/api/userServices';
import { ResponseUser, RoleType } from '@/api/ResType';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
interface ItemRole {
    key: string;
    label: string;
    value: string;
}
type DataIndex = keyof ResponseUser;
function UserList() {
    const [data, setData] = React.useState<ResponseUser[]>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<ResponseUser>();
    const [listRoles, setListRoles] = React.useState<ItemRole[]>([]);
    const [roleKey, setRoleKey] = React.useState<string>('');
    //search
    //product search
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const searchInput = React.useRef<InputRef>(null);

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    //
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ResponseUser> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns: TableColumnsType<ResponseUser> = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'name',
        },
        {
            title: 'Họ Tên',
            dataIndex: 'fullName',
            key: 'name',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'Action',
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setOpen(true);
                        setCurrentUser(record);
                    }}
                    icon={<EditOutlined />}
                >
                    Edit role
                </Button>
            ),
        },
    ];
    const getAllUser = async (roleName: string) => {
        const res = await userServices.getAllUser(roleName);
        console.log(res);
        if (res.isSuccessed === true) {
            setData(res.resultObj);
        }
    };
    const getAllRolesGenerator = useCallback(async () => {
        const res = await userServices.getRoles();
        if (res.isSuccessed === true) {
            const item: ItemRole[] = [];
            res.resultObj.forEach((e: RoleType) => {
                const i: ItemRole = {
                    label: e.name,
                    key: e.name,
                    value: e.name,
                };
                item.push(i);
            });
            setListRoles(item);
            setRoleKey(item[0].key);
            getAllUser(item[0].key);
        }
    }, []);
    useEffect(() => {
        getAllRolesGenerator();
    }, [getAllRolesGenerator]);
    const onChange = (key: string) => {
        getAllUser(key);
        setRoleKey(key);
    };
    const handleChangeSelect = (value: string) => {
        setRoleKey(value);
    };
    const handleAssginRole = async () => {
        if (typeof currentUser !== 'undefined') {
            await userServices.assginRoles(currentUser.id, roleKey);
            setOpen(false);
            getAllRolesGenerator();
        }
    };
    return (
        <div>
            <Tabs
                defaultActiveKey="customer"
                items={listRoles}
                onChange={onChange}
                indicator={{
                    size: (origin) => origin - 20,
                }}
            />
            <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
            <Modal onCancel={() => setOpen(false)} onOk={() => handleAssginRole()} open={open} title={'Edit role'}>
                <Select onChange={handleChangeSelect} value={roleKey} style={{ width: '100%' }} options={listRoles} />
            </Modal>
        </div>
    );
}

export default UserList;