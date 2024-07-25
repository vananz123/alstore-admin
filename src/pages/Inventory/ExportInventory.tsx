/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, GetRef, Input, InputRef, Popconfirm, Row, Select, Space, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectDepartment } from '@/app/feature/department/reducer';
import SearchProductItem from './SearchProductItem';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductItemSearch } from '@/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as inventoryServices from '@/api/inventoryServices';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import { Result } from '@/api/ResType';
import useTemoranySave from '@/hooks/useTemoranySave';
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    console.log(index);
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
                        message: `${title} is required.`
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
function ExportInventory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { contextHolder, openNotification } = useNotification();
    const [listProductItem, setListProductItem] = React.useState<ProductItemSearch[]>([]);
    const { data: department, selected } = useAppSelector(selectDepartment);
    const { data: inventoty } = useQuery({
        queryKey: [`load-his-inventory`, id],
        queryFn: () => inventoryServices.getById(Number(id)).then((data)=> data.resultObj),
        enabled: !!id,
    });
    useEffect(() => {
        if (inventoty) {
            const item: ProductItemSearch[] = [];
            inventoty.items.forEach((e) => {
                item.push({
                    id: e.productItemId,
                    productId: e.productId,
                    seoTitle: e.seoTitle,
                    quantity: 1,
                    urlThumbnailImage: e.urlThumbnailImage,
                    price: e.price,
                    sku: e.sku,
                    stock: e.stock,
                    name: e.name,
                    value: e.value,
                });
            });
            setListProductItem(item);
        }
    }, [id, inventoty]);
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
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stock',
        },
        {
            title: 'Giá (edit)',
            dataIndex: 'price',
            width: '20%',
            editable: true,
        },
        {
            title: 'Số lượng (edit)',
            dataIndex: 'quantity',
            width: '20%',
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
    interface Body {
        departmentId: number;
        data: ProductItemSearch[];
    }
    const { showBoundary } = useErrorBoundary();
    const { data, generateOption, setListProduct, removeItemProduct } = useTemoranySave('export');
    const exportInventory = useMutation({
        mutationKey: ['import-inventory'],
        mutationFn: (body: Body) => inventoryServices.exportInventory(body.departmentId, body.data),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                openNotification('success', data.message);
                setListProductItem([]);
            }
        },
        onError(error: AxiosError<Result>) {
            if (error.response?.status === 403) {
                showBoundary(error);
            } else {
                openNotification('error', error.response?.data.message);
            }
        },
    });
    const ImportInventory = () => {
        const body: Body = {
            departmentId: selected,
            data: listProductItem,
        };
        if (listProductItem.length > 0 && selected !== 1) {
            exportInventory.mutateAsync(body);
        }
    };
    const temporanySave = () => {
        setOptionKey(data.length);
        setListProduct(listProductItem);
    };
    const [optionKey, setOptionKey] = React.useState<number>(-1);
    const changeTemoranySave = (value: number) => {
        setOptionKey(value);
        if (value !== -1 && data) {
            setListProductItem(data[value].items);
        } else {
            setListProductItem([]);
        }
    };
    const temporanyDelete = () => {
        removeItemProduct(optionKey);
        setOptionKey(-1);
        setListProductItem([]);
    };
    return (
        <div>
            {contextHolder}
            <Row className="mb-3" gutter={[12, 12]}>
                <Col xs={24} xl={18}>
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
                </Col>
                <Col xs={24} xl={6}>
                    <Select
                        value={optionKey}
                        disabled={generateOption.length <= 1}
                        onChange={changeTemoranySave}
                        className="w-full"
                        options={generateOption}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xl={18}>
                    <SearchProductItem
                        className="w-full"
                        listProductItem={listProductItem}
                        onSetList={setListProductItem}
                        type="export"
                    />
                    <Table
                        style={{ width: '100%' }}
                        components={components}
                        rowClassName={() => 'editable-row'}
                        rowKey={(e) => e.id}
                        columns={columns as ColumnTypes}
                        dataSource={listProductItem}
                    />
                </Col>
                <Col xl={6}>
                    <Card title="Thông tin chuyển hàng">
                        {department && selected > 0 && (
                            <p className="text-base mb-3">
                                Chi nhánh: {department.find((s) => s.id === selected)?.name}
                            </p>
                        )}
                        <p className="text-base mb-3">Số sản phẩm: {listProductItem.length}</p>
                        <div className="flex gap-2 mb-3">
                            <div className="w-[50%]">
                                <Button
                                    block
                                    type="primary"
                                    onClick={() => temporanyDelete()}
                                    disabled={optionKey === -1}
                                >
                                    Xóa
                                </Button>
                            </div>
                            <div className="w-[50%]">
                                <Button
                                    block
                                    type="primary"
                                    onClick={() => temporanySave()}
                                    disabled={listProductItem.length <= 0 || optionKey !== -1}
                                >
                                    Lưu tạm
                                </Button>
                            </div>
                        </div>
                        <Button
                            block
                            type="primary"
                            loading={exportInventory.isPending}
                            onClick={() => ImportInventory()}
                            disabled={listProductItem.length <= 0 || selected === 1}
                        >
                            Chuyển hàng
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ExportInventory;
