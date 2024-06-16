/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Form,
    GetRef,
    Input,
    InputRef,
    Popconfirm,
    Row,
    Space,
    Table,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import SearchProductItem from './SearchProductItem';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductItemSearch } from '@/type';
import { useMutation } from '@tanstack/react-query';
import * as inventoryServices from '@/api/inventoryServices';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
    index: number;
}
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    console.log(index)
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof ProductItemSearch;
    record: ProductItemSearch;
    handleSave: (record: ProductItemSearch) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input type="number" min={1} value={1} ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
function ImportInventory() {
    const navigate = useNavigate();
    const {contextHolder,openNotification} = useNotification()
    const [listProductItem, setListProductItem] = React.useState<ProductItemSearch[]>([]);
    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Seo',
            dataIndex: 'seoTitle',
        },
        {
            title: 'Mô tả',
            dataIndex: 'name',
            render: (_, record) => <>{record.name && <span>{`${record.name}: ${record.value}`}</span>}</>,
        },{
            title: 'Giá (edit)',
            dataIndex:'price',
            width:'20%',
            editable: true,
        },
        {
            title: 'Số lượng (edit)',
            dataIndex: 'quantity',
            width:'20%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Xóa"
                        onConfirm={() => {
                            const listNew = listProductItem.filter((s) => s.id !== record.id);
                            setListProductItem(listNew);
                        }}
                    >
                        <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const handleSave = (row: ProductItemSearch) => {
        const newData = [...listProductItem];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setListProductItem(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: ProductItemSearch) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    const {showBoundary} = useErrorBoundary()
    const importInventory = useMutation({
        mutationKey:['import-inventory'],
        mutationFn:(data:ProductItemSearch[])=> inventoryServices.importInventory(data),
        onSuccess:((data)=>{
            if(data.isSuccessed === true){
                openNotification('success',data.message)
                setListProductItem([])
            }else{
                openNotification('error',data.message)
            }
        }),
        onError:(error:AxiosError)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }
        }
    })
    const ImportInventory = ()=>{
        if(listProductItem.length > 0){
            console.log(listProductItem)
            importInventory.mutateAsync(listProductItem)
        }
    }
    return (
        <div>
            {contextHolder}
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
            <Row gutter={16}>
                <Col xl={18}>
                    <SearchProductItem className="my-3 w-auto" listProductItem={listProductItem} onSetList={setListProductItem} />
                    <Table
                    style={{width:'100%'}}
                        components={components}
                        rowClassName={() => 'editable-row'}
                        rowKey={(e) => e.id}
                        columns={columns as ColumnTypes}
                        dataSource={listProductItem}
                    />
                </Col>
                <Col xl={6}>
                    <Card title="Thông tin nhập hàng">
                    <p className='text-base mb-3'>Chi nhánh trung tâm</p>
                        <p className='text-base mb-3'>Số sản phẩm: {listProductItem.length}</p>
                        <Button block type='primary' loading={importInventory.isPending} onClick={()=> ImportInventory()} disabled={listProductItem.length <= 0}>Nhập hàng</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ImportInventory;
