import { OrderDetail, OrderStatus, Review } from '@/api/ResType';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import {
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Drawer,
    Flex,
    Form,
    FormProps,
    Input,
    Modal,
    Rate,
    Row,
    Timeline,
    notification,
} from 'antd';
import { DescriptionsProps, Typography } from 'antd';
import * as reviewServices from '@/api/reviewServices';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import UserOrderDatailLoading from './UserOrderDatailLoading';
import Container from '@/conponents/Container';
type NotificationType = 'success' | 'error';
type TimeLineProps = {
    label?: string;
    children: string;
};
type ConfirmType = 'CANCELED' | 'SUCCESSED' | 'RETURNED';
function UserOrderDetail() {
    const { id } = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { Paragraph } = Typography;
    const [form] = Form.useForm();
    const user = useAppSelector(selectUser).data;
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const { data, isLoading, refetch } = useQuery({
        queryKey: [`order-detail`],
        queryFn: () => orderServices.getOrderDetailByOrderId(Number(id)),
    });
    const order = data;
    const [currentOD, setCurrentOD] = React.useState<OrderDetail>();
    const [openModal, setOpenModal] = React.useState(false);
    const [confirm, setConfirm] = React.useState<ConfirmType>();
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const statusTimeLine: TimeLineProps[] = [];
    if (order) {
        order.status?.forEach((element: OrderStatus) => {
            const line: TimeLineProps = {
                children: element.name + ': ' + dayjs(element.createAt).format('MM/DD/YYYY, HH:MM'),
            };
            statusTimeLine.push(line);
        });
    }
    const onFinish: FormProps<Review>['onFinish'] = async (values) => {
        if (currentOD != undefined && user != undefined) {
            if (currentOD?.review == undefined) {
                values.userId = user.id;
                values.orderDetailId = currentOD.id;
                const res = await reviewServices.createReivew(values);
                if (res.isSuccessed === true) {
                    refetch();
                    onClose();
                }
            } else {
                values.id = currentOD?.review.id;
                const res = await reviewServices.updateReivew(values);
                if (res.isSuccessed === true) {
                    refetch();
                    onClose();
                }
            }
        }
    };

    const onFinishFailed: FormProps<Review>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [open, setOpen] = React.useState(false);

    const showDrawer = (e: OrderDetail) => {
        setCurrentOD(e);
        if (e?.review == null) {
            form.setFieldValue('comment', '');
            form.setFieldValue('rate', 0);
        } else {
            form.setFieldsValue(e.review);
        }

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        if (typeof order != 'undefined') {
            let res;
            if (confirm == 'CANCELED') {
                res = await orderServices.canceled(order.id);
            } else if (confirm == 'SUCCESSED') {
                res = await orderServices.successed(order.id);
            } else {
                res = await orderServices.returned(order.id);
            }
            if (res.isSuccessed === true) {
                refetch();
                openNotificationWithIcon('success', res.message);
            } else {
                openNotificationWithIcon('error', res.message);
            }
        }
        setOpenModal(false);
        setConfirmLoading(false);
    };
    const desOrder: DescriptionsProps['items'] = [
        {
            key: 'address',
            label: 'Địa Chỉ',
            children: (
                <>
                    <p>{order?.address?.phoneNumber}</p>
                    <p>
                        {order?.address?.streetNumber +
                            ', ' +
                            order?.address?.wardCommune +
                            ', ' +
                            order?.address?.urbanDistrict +
                            ', ' +
                            order?.address?.province}
                    </p>
                </>
            ),
        },
        {
            key: 'paymentMethod',
            label: 'Loại Thanh Toán',
            children: `${order?.paymentMethod?.paymentType}`,
        },
        {
            key: 'orderTotal',
            label: 'Tổng Tiền',
            children: `${ChangeCurrence(order?.orderTotal)}`,
        },
        {
            key: 'status',
            label: 'Tình Trạng',
            children: (
                <div>
                    <Timeline mode={'left'} items={statusTimeLine} />
                </div>
            ),
        },
    ];
    return (
        <Container>
            {contextHolder}
            {isLoading ? (
                <UserOrderDatailLoading />
            ) : (
                order && (
                    <>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            size="small"
                            style={{ marginBottom: '10px' }}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Go back
                        </Button>
                        <Row gutter={16}>
                            <Col span={8} xs={24} md={24} lg={8} xl={8}>
                                <Descriptions
                                    title="Thông Tin Đơn Hàng"
                                    column={1}
                                    size="middle"
                                    items={desOrder}
                                    bordered
                                />
                                {order.status && (
                                    <>
                                        {order.isSuccsessedButton && (
                                            <Button
                                                style={{ marginTop: 10 }}
                                                type="primary"
                                                block
                                                onClick={() => {
                                                    setConfirm('SUCCESSED');
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Đã nhận hàng
                                            </Button>
                                        )}
                                        {order.isCanceledButton && (
                                            <Button
                                                style={{ marginTop: 10 }}
                                                type="primary"
                                                danger
                                                block
                                                onClick={() => {
                                                    setConfirm('CANCELED');
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Hủy
                                            </Button>
                                        )}
                                        {order.isReturnedButton && (
                                            <Button
                                                style={{ marginTop: 10 }}
                                                type="primary"
                                                block
                                                onClick={() => {
                                                    setConfirm('RETURNED');
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Yêu cầu trả hàng/hoàn tiền
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Col>
                            <Col span={16} xs={24} md={24} lg={16} xl={16}>
                                <Card title="Danh sách sản phẩm" bordered={false}>
                                    <div>
                                        {order.orderDetail?.map((e: OrderDetail) => (
                                            <React.Fragment key={e.id}>
                                                <Flex vertical>
                                                    <div className="w-[300px] xs:w-[400px] sm:w-[500px] md:w-full">
                                                        <Paragraph
                                                            ellipsis={{
                                                                rows: 1,
                                                            }}
                                                        >
                                                            <Link to={`/product/detail/${e.productId}`}>
                                                                {e.seoTitle}
                                                            </Link>
                                                        </Paragraph>
                                                    </div>
                                                    <Row gutter={16} align={'top'}>
                                                        <Col xs={8} lg={8}>
                                                            <div className="w-[100px]">
                                                                <img
                                                                    src={`${baseUrl + e.urlThumbnailImage}`}
                                                                    className="w-full h-full"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs={16} lg={16}>
                                                            <Flex justify={'space-between'} wrap="wrap">
                                                                <div>
                                                                    <span>Số lượng: {e.quantity}</span>
                                                                    <p>Giá: {e.price}</p>
                                                                    {e.value != undefined && (
                                                                        <p>Size: {e.value + ' ' + e.sku}</p>
                                                                    )}
                                                                    <p>Thành tiền: {ChangeCurrence(e.total)}</p>
                                                                </div>
                                                                <div className="hidden sm:block">
                                                                    <Button
                                                                        type="primary"
                                                                        size="middle"
                                                                        disabled={
                                                                            order?.status?.some(
                                                                                (s) => s.name === 'Đã hoàn thành',
                                                                            ) === false
                                                                        }
                                                                        onClick={() => {
                                                                            showDrawer(e);
                                                                        }}
                                                                    >
                                                                        {e.review?.comment == null
                                                                            ? 'Đánh giá'
                                                                            : 'Xem đánh giá'}
                                                                    </Button>
                                                                </div>
                                                            </Flex>
                                                        </Col>
                                                        <Col span={24}>
                                                            <div className="sm:hidden">
                                                                <Button
                                                                    type="primary"
                                                                    size="middle"
                                                                    block
                                                                    disabled={
                                                                        order?.status?.some(
                                                                            (s) => s.name === 'Đã hoàn thành',
                                                                        ) === false
                                                                    }
                                                                    onClick={() => {
                                                                        showDrawer(e);
                                                                    }}
                                                                >
                                                                    {e.review?.comment == null
                                                                        ? 'Đánh giá'
                                                                        : 'Xem đánh giá'}
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Flex>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <Drawer title="Bình luận" onClose={onClose} open={open}>
                            {order && (
                                <Form
                                    form={form}
                                    name="productFrom"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    style={{ maxWidth: 600 }}
                                    scrollToFirstError
                                >
                                    <Form.Item<Review>
                                        name="comment"
                                        tooltip="What do you want others to call you?"
                                        rules={[{ required: true, message: 'Please input Content!', whitespace: true }]}
                                    >
                                        <Input.TextArea placeholder="Content" />
                                    </Form.Item>
                                    <Form.Item<Review> name="rate">
                                        <Rate />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ width: '100px' }}>
                                            {' '}
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )}
                        </Drawer>
                        <Modal
                            title="Xác nhận"
                            open={openModal}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={() => {
                                setOpenModal(false);
                            }}
                        >
                            <p>Thao táo này không thể hoàn tác!</p>
                        </Modal>
                    </>
                )
            )}
        </Container>
    );
}
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default UserOrderDetail;
