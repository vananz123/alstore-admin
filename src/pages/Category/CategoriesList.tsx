import { Table, Space, Modal, Button, Flex } from 'antd';
import type { TableColumnsType } from 'antd';
import { getAllAdminCate, deleteCate } from '@/api/categoryServices';
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Category } from '@/type';
import { OPTIONS_STATUS, PAPINATION } from '@/common/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useImmer } from 'use-immer';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import StatusTag from '@/conponents/StatusTag';
import { isAxiosBadRequestError, isAxiosUnauthoriedError } from '@/utils/utils';
import { useErrorBoundary } from 'react-error-boundary';
function CategoriesList() {
    const [open, setOpen] = useImmer(false);
    const [context, setContext] = useImmer<{ currentId: number; modalText: string }>({
        currentId: 0,
        modalText: '',
    });
    const { contextHolder, openNotification } = useNotification();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['load-list-category'],
        queryFn: () => getAllAdminCate('sub').then((data) => data.resultObj),
    });
    const columnss: TableColumnsType<Category> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <StatusTag status={record.status} options={OPTIONS_STATUS} />,
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/category/edit/${record.id}`}><EditOutlined/></Link>
                    <a onClick={() => showModalDel(record.id, record.name)}><DeleteOutlined/></a>
                </Space>
            ),
        },
    ];
    const columns: TableColumnsType<Category> = [
        Table.EXPAND_COLUMN,
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <StatusTag status={record.status} options={OPTIONS_STATUS} />,
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/category/edit/${record.id}`}><EditOutlined/></Link>
                    {record.subCategory && record.subCategory.length <= 0 && (
                        <a onClick={() => showModalDel(record.id, record.name)}><DeleteOutlined/></a>
                    )}
                </Space>
            ),
        },
    ];
    const { showBoundary } = useErrorBoundary();
    const mutationDel = useMutation({
        mutationKey: ['del-category', context.currentId],
        mutationFn: (id: number) => deleteCate(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                setOpen(false);
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (isAxiosUnauthoriedError(error)) {
                showBoundary(error);
            }
            if (isAxiosBadRequestError(error)){
                setOpen(false);
                openNotification('error', error.response?.data.message);
            }
        },
    });
    const showModalDel = (id: number, name: string) => {
        setContext((draft) => {
            (draft.currentId = id), (draft.modalText = `Bạn có chắc chắc xóa danh mục ${name}?`);
        });
        setOpen(true);
    };
    const handleOkDel = () => {
        if (context.currentId !== 0) {
            mutationDel.mutateAsync(context.currentId);
        }
    };
    return (
        <div>
            {contextHolder}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify='end'>
                   <Space>
                        <Link to={'/category/add'}>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Thêm
                            </Button>
                        </Link>
                        <Button icon={<ReloadOutlined />}>
                            </Button>
                   </Space>
                </Flex>
                <Table
                    loading={isLoading}
                    rowKey={(record) => record.id}
                    pagination={PAPINATION}
                    columns={columns}
                    dataSource={data}
                    expandable={{
                        expandedRowRender: (recore) => {
                            return (
                                <Table
                                    rowKey={(recore) => recore.id}
                                    columns={columnss}
                                    dataSource={recore.subCategory}
                                />
                            );
                        },
                    }}
                />
            </Space>
            <Modal
                title="Xóa loại sản phẩm"
                open={open}
                onOk={handleOkDel}
                confirmLoading={mutationDel.isPending}
                onCancel={() => setOpen(false)}
            >
                <p>{context.modalText}</p>
            </Modal>
        </div>
    );
}

export default CategoriesList;
