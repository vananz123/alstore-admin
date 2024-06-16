import { Guaranty } from "@/type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Space, TableProps, Table, Modal } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as guarantyServices from '@/api/guarantyServices'
import useSearchIndexTable from "@/hooks/useSearchIndexTable";
function GuaranriesList() {
    const [data, setData] = React.useState<Guaranty[]>();
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context, setContext] = React.useState<string>('OK');
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const {getColumnSearchProps} = useSearchIndexTable()
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
            ...getColumnSearchProps<Guaranty>("name")
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'dateCreate',
            key: 'dateCreate',
            render: (_, record) => <p>{new Date(record.dateCreated).toUTCString()}</p>,
        },
        {
            title: 'Ngày bắt đâu',
            dataIndex: 'dateModify',
            key: 'dateModify',
            render: (_, record) => <p>{new Date(record.dateModify).toUTCString()}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/guaranty/edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number, name: string) => {
        setModalText(`Do you want guaranty ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const getAllGuaranty = async () =>{
        const res = await guarantyServices.getAllGuaranty();
        console.log(res)
        if(res.isSuccessed ===true){
            setData(res.resultObj);
        }
    };
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setContext('');
        setTimeout(async () => {
            const res = await guarantyServices.deleteGuaranty(currentId)
            if (res.isSuccessed === true) {
                getAllGuaranty()
                setOpen(false);
                setConfirmLoading(false);
                setModalText('success')
                setContext('OK')
            } else {
                setModalText('error!');
                setConfirmLoading(false);
                setContext('OK')
            }
        }, 300);
    };
    useEffect(()=>{
        //load api voo dday 
        getAllGuaranty();
    },[])
    return <div>
        <Space direction="vertical" style={{width:"100%"}}>
                <Flex justify="space-between">
                    <Link to={'/guaranty/add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                    {/* <SearchC typeSearch={2} onSetState={setData} /> */}
                </Flex>
                <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                okText={context}
            >
                <p>{modalText}</p>
            </Modal>
        
    </div>;
}

export default GuaranriesList;