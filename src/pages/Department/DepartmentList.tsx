import { Department } from '@/type';
import { TableProps, Space, Modal, Flex, Button,Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {deleteDepartment,getAllDepartment} from '@/api/departmentServices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { OPTIONS_STATUS } from '@/common/common';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { useImmer } from 'use-immer';
import useNotification from '@/hooks/useNotification';
function DepartmentList() {
    const [open, setOpen] = useImmer(false);
    const [context,setContext] = useImmer<{currentId:number,modalText:string}>({
        currentId:0,
        modalText:''
    })
    const {contextHolder,openNotification}= useNotification()
    const { isLoading, data , refetch} = useQuery({
        queryKey:['load-departments'],
        queryFn:()=>  getAllDepartment().then((data) => data.resultObj)
    })
    const mutationDepartment = useMutation({
        mutationKey:[`delete-depaerment`,context.currentId],
        mutationFn:(id:number)=> deleteDepartment(id),
        onSuccess:(data)=>{
            if(data.isSuccessed === true){
                refetch()
            }
        },
        onError:((error:AxiosError<Result>)=>{
            setOpen(false)
            if(error.response?.status === 403){
                //
            }else{
                openNotification('error', error.response?.data.message)
            }
        })
    })
    const renderTag = (status:number)=>{
        const option = OPTIONS_STATUS?.find(x => x.value == status)
        return <Tag color={option?.color}>{option?.label}</Tag>
    }
    const {getColumnSearchProps} = useSearchIndexTable()
    const columns: TableProps<Department>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps<Department>('phoneNumber')
        },
        {
            title: 'Tên Chi Nhánh',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps<Department>('name')
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps<Department>('address')
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render:(_,record)=>(
                renderTag(record.status)
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/department/edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number, name: string) => {
        setContext((draft)=>{
            draft.currentId = id,
            draft.modalText = `Bạn có muốn xóa chi nhánh ${name}!`
        })
        setOpen(true);
    };
    const handleOkDel = () => {
        if(context.currentId !== 0) mutationDepartment.mutateAsync(context.currentId)
    };
    return (
        <div>
            {contextHolder}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/department/add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                </Flex>
                <Table loading={isLoading} pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={mutationDepartment.isPending}
                onCancel={() => setOpen(false)}
            >
                <p>{context.modalText}</p>
            </Modal>
        </div>
    );
}
export default DepartmentList;
