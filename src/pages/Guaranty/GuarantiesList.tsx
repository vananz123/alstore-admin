import { Guaranty } from '@/type';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space, TableProps, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { getAllGuaranty, deleteGuaranty } from '@/api/guarantyServices';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useImmer } from 'use-immer';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { isAxiosBadRequestError, isAxiosUnauthoriedError } from '@/utils/utils';
import { useErrorBoundary } from 'react-error-boundary';
import { PAPINATION } from '@/common/common';
import dayjs from 'dayjs';
function GuaranriesList() {
    const [content, setContent] = useImmer<{ currentId: number; context: string }>({
        currentId: 0,
        context: '',
    });
    const { contextHolder, openNotification } = useNotification();
    const [open, setOpen] = useImmer(false);
    const { getColumnSearchProps } = useSearchIndexTable();
    const { data, isLoading } = useQuery({
        queryKey: ['load-list-guaranty'],
        queryFn: () => getAllGuaranty().then((data) => data.resultObj),
    });
    const columns: TableProps<Guaranty>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps<Guaranty>('name'),
        },{
            title: 'Thời hạn',
            dataIndex: 'period',
            key: 'period',
            render: (_, record) => <p>{record.period +" " + record.sku}</p>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'dateCreate',
            key: 'dateCreate',
            render: (_, record) => <p>{dayjs(record.dateCreated).format("MM/DD/YYYY")}</p>,
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/guaranty/edit/${record.id}`}>Sửa</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Xóa</a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number, name: string) => {
        setContent((draft) => {
            (draft.currentId = id), (draft.context = `Bạn có chắn muốn xóa ${name}!`);
        });
        setOpen(true);
    };
    const { showBoundary } = useErrorBoundary();
    const del = useMutation({
        mutationKey: ['del-guaranty', content.currentId],
        mutationFn: (id: number) => deleteGuaranty(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                setOpen(false);
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (isAxiosUnauthoriedError(error)) showBoundary(error);
            if (isAxiosBadRequestError(error)){
                setOpen(false);
                openNotification('error', error.response?.data.message);
            }
        },
    });
    const handleOkDel = () => {
        if (content.currentId !== 0) del.mutateAsync(content.currentId);
    };
    return (
        <div>
            {contextHolder}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/guaranty/add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                </Flex>
                <Table loading={isLoading} pagination={PAPINATION} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Xóa bảo hành"
                open={open}
                onOk={handleOkDel}
                confirmLoading={del.isPending}
                onCancel={() => setOpen(false)}
            >
                <p>{content.context}</p>
            </Modal>
        </div>
    );
}

export default GuaranriesList;
