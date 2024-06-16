/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import * as guarantyServieces from '@/api/guarantyServices';
import * as productServices from '@/api/productServices';
import { Guaranty, ProductItem } from '@/type';
import { Button, Flex, Modal, Space, Table, TableColumnsType } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { RowSelectMethod, TableRowSelection } from 'antd/es/table/interface';
export type ModePromotionType = 'EDIT' | 'DEL';
import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useNotification from '@/hooks/useNotification';
interface Props {
    openModalAssignPI: boolean;
    setStateOpenModalAssignPI: SetStateAction<any>;
    productItemProps: ProductItem | undefined;
    refetch: () => void;
}
const ModalAssignGuarantiesProductItem: React.FC<Props> = ({
    openModalAssignPI,
    setStateOpenModalAssignPI,
    productItemProps,
    refetch,
}) => {
    const { showBoundary } = useErrorBoundary();
    const [guaranties, setGuaranties] = React.useState<Guaranty[]>([]);
    const [listSelectRowKeys, setListSelectRowKeys] = React.useState<number[]>([]);
    //const [listSelectRow, setListSelectRow] = React.useState<Guaranty[]>([]);
    const {contextHolder,openNotification} = useNotification()
    const getAllGuaranty = async () => {
        const res = await guarantyServieces.getAllGuaranty();
        if (res.isSuccessed === true) {
            setGuaranties(res.resultObj);
        }
    };
    interface RequsetBody {
        id: number;
        data: number;
    }
    const mutation = useMutation({
        mutationKey: ['assgin-guaranty'],
        mutationFn: (body: RequsetBody) => productServices.assignGuaranties(body.id, body.data),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                openNotification('success', data.message);
                refetch();
            } else {
                openNotification('error',  data.message);
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 403) showBoundary(error);
        },
    });
    const handleSaveGuaranties = async () => {
        if (productItemProps != undefined) {
            const body: RequsetBody = {
                id: productItemProps?.id,
                data: listSelectRowKeys[0],
            };
            mutation.mutateAsync(body);
        }
    };
    useEffect(() => {
        getAllGuaranty();
        if (typeof productItemProps?.guaranty !== 'undefined') {
            const arrKey: number[] = [];
            arrKey.push(productItemProps.guaranty.id);
            setListSelectRowKeys(arrKey);
        }
    }, [openModalAssignPI, productItemProps]);
    const columns: TableColumnsType<Guaranty> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/guaranties-edit/${record.id}`}>Edit</Link>
                </Space>
            ),
        },
    ];
    const rowSelection: TableRowSelection<Guaranty> = {
        selectedRowKeys: listSelectRowKeys,
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows: Guaranty[], info: { type: RowSelectMethod }) => {
            const arrKey: number[] = [];
            selectedRows.forEach((e: Guaranty) => {
                arrKey.push(e.id);
            });
            setListSelectRowKeys(arrKey);
            console.log(`${info},selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        //   },
        //   onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        //   },
        getCheckboxProps: (record: Guaranty) => ({
            name: record.name,
            // disabled: modePromotion === 'DEL' ? record.discountRate == undefined : false, // Column configuration not to be checked
        }),
    };
    return (
        <div>
            {contextHolder}
            <Modal
                title="Thêm bảo hành"
                open={openModalAssignPI}
                confirmLoading={mutation.isPending}
                onCancel={() => setStateOpenModalAssignPI(false)}
                footer=""
            >
                <Flex justify="space-between" style={{ marginBottom: 10 }}>
                    <Link to={'/admin/guaranties-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    <Space>
                        <Button
                            onClick={() => {
                                handleSaveGuaranties();
                            }}
                            type="primary"
                            size="large"
                        >
                            Save
                        </Button>
                    </Space>
                </Flex>
                <Table
                    pagination={{ position: ['none'] }}
                    columns={columns}
                    dataSource={guaranties}
                    rowKey={(record) => record.id}
                    rowSelection={rowSelection}
                />
            </Modal>
        </div>
    );
};

export default ModalAssignGuarantiesProductItem;
