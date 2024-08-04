export interface NavType {
    key: string;
    label: React.ReactNode | string;
    link: string;
    icon?: React.ReactNode | undefined;
    children?: NavType[];
}
import {
    AppstoreOutlined,
    AuditOutlined,
    GroupOutlined,
    PieChartOutlined,
    ProductOutlined,
    ShoppingOutlined,
    TagOutlined,
    ToolOutlined,
    TranslationOutlined,
    UserOutlined,
} from '@ant-design/icons';
export const LIST_NAV_DATA: NavType[] = [
    {
        key: 'Chi Nhánh',
        label: 'Chi Nhánh',
        link: '/department',
        icon: <GroupOutlined />,
    },
    {
        key: 'Mục lục',
        label: 'Mục lục',
        link: '/catalog',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'Loại Sản Phẩm',
                label: 'Loại Sản Phẩm',
                link: '/category',
                icon: <AppstoreOutlined />,
            },
            {
                key: 'Sản Phẩm',
                label: 'Sản Phẩm',
                link: '/product',
                icon: <ProductOutlined />,
            },
            {
                key: 'Giảm giá',
                label: 'Giảm giá',
                link: '/promotion',
                icon: <TagOutlined />,
            },
            {
                key: 'Bảo hành',
                label: 'Bảo hành',
                link: '/guaranty',
                icon: <ToolOutlined />,
            },
        ],
    },

    {
        key: 'Giao dịch',
        label: 'Giao dịch',
        link: '/translation',
        icon: <TranslationOutlined />,
    },
    {
        key: 'Đơn hàng',
        label: 'Đơn hàng',
        link: '/order',
        icon: <ShoppingOutlined />,
    },
    {
        key: 'Người dùng',
        label: 'Người dùng',
        link: '/user',
        icon: <UserOutlined />,
    },
    {
        key: 'Vai trò',
        label: 'Vai trò',
        link: '/role',
        icon: <AuditOutlined />,
    },
    {
        key: 'Thống kê',
        label: 'Thống kê',
        link: '/',
        icon: <PieChartOutlined />,
    },
];