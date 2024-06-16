/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useCallback, useEffect } from 'react';
import * as promotionServices from '@/api/promotionServices';
import * as productServices from '@/api/productServices';
import { ProductItem } from '@/type';
import { Button, Flex, Modal, Space, Table, TableColumnsType } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
export type ModePromotionType = 'EDIT' | 'DEL';
import { Promotion } from '@/api/ResType';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import useNotification from '@/hooks/useNotification';
interface Props {
    openModalAssignPI: boolean;
    setStateOpenModalAssignPI: SetStateAction<any>;
    productItemProps: ProductItem | undefined;
    refetch: ()=> void;
}
interface RequsetBody {
    id:number,
    data:Promotion[]
}
const ModalAssginPromotionsProductItem: React.FC<Props> = ({
    openModalAssignPI,
    setStateOpenModalAssignPI,
    productItemProps,refetch,
}) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [listSelectRowKeys, setListSelectRowKeys] = React.useState<number[]>([]);
    const {contextHolder,openNotification} = useNotification()
    const {data:promotions} = useQuery({
        queryKey:['load-all-promotion'],
        queryFn:()=> promotionServices.getAllPromotion()
    })
    const {data:listPromotionByPI} = useQuery({
        queryKey:[`load-all-promotion-${productItemProps}`],
        queryFn:()=> promotionServices.getAllPromotionByPI(productItemProps ? productItemProps.id : 0),
        enabled:!!productItemProps
    }) 
    const {showBoundary} = useErrorBoundary()
    const mutation = useMutation({
        mutationKey:['assgin-promotion'],
        mutationFn:(body:RequsetBody)=> productServices.assignPromotion(body.id,body.data),
        onSuccess:(data)=>{
            if (data.isSuccessed === true) {
                openNotification('success',data.message);
                refetch()
            } else {
                openNotification('error', data.message);
            }
        },
        onError:((error:AxiosError)=>{
            if(error.response?.status === 403) showBoundary(error)
        })
    })
    const handleSaveGuaranties = async () => {
        setConfirmLoading(true);
        if (productItemProps != undefined && promotions) {
            const requset:RequsetBody ={
                id :productItemProps.id,
                data:promotions.filter((s) => listSelectRowKeys.includes(s.id))
            }
            mutation.mutate(requset)
        }
    };
    const GenaratorListSelectRowKeys = useCallback(async()=>{
        if (listPromotionByPI) {
            const arrKey: number[] = [];
            listPromotionByPI.forEach((e: Promotion) => {
                arrKey.push(e.id);
            });
            setListSelectRowKeys(arrKey);
        }
    },[listPromotionByPI])
    useEffect(() => {
        GenaratorListSelectRowKeys()
    }, [openModalAssignPI,GenaratorListSelectRowKeys]);

    const columns: TableColumnsType<Promotion> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'value/type',
            dataIndex: 'value',
            key: 'Promotion',
            render:(_,record)=>(
                <p>{record.type == 'fixed' ? `${record.value}VNG`: `${record.value}%`}</p>
            )
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },{
            title: 'Bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            render:(_,record)=>(
                <p>{dayjs(record.startDate).format('YYYY/MM/DD')}</p>
            ),
        },{
            title: 'Kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render:(_,record)=>(
                <p>{dayjs(record.endDate).format('YYYY/MM/DD')}</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/promotion-edit/${record.id}`}>Edit</Link>
                </Space>
            ),
        },
    ];
    const rowSelection: TableRowSelection<Promotion> = {
        selectedRowKeys: listSelectRowKeys,
        hideSelectAll :true,
        onChange: (selectedRowKeys, selectedRows: Promotion[]) => {
            const arrKey: number[] = [];
            selectedRows.forEach((e: Promotion) => {
                arrKey.push(e.id);
            });
            setListSelectRowKeys(arrKey);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        //   },
        //   onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        //   },
        getCheckboxProps: (record: Promotion) => ({
            name: record.name,
            //disabled: listSelectRowKeys.length > 1 ? false : true, // Column configuration not to be checked
        }),
    };
    return (
        <div>
            {contextHolder}
            <Modal
            width={800}
                title="Thêm khuyến mãi"
                open={openModalAssignPI}
                confirmLoading={confirmLoading}
                onCancel={() => setStateOpenModalAssignPI(false)}
                footer=""
            >
                <Flex justify="space-between" style={{ marginBottom: 10 }}>
                    <Link to={'/admin/promotion-add'}>
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
                    loading={mutation.isPending}
                    pagination={{ position: ['none'] }}
                    columns={columns}
                    dataSource={promotions}
                    rowKey={(record) => record.id}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                />
            </Modal>
        </div>
    );
};

export default ModalAssginPromotionsProductItem;
