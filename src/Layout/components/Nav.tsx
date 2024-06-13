import React, { CSSProperties } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useSkin } from '@/hooks';
import { AppstoreOutlined, DiffOutlined, GroupOutlined, PieChartOutlined, ProductOutlined, ShoppingOutlined, TagOutlined, ToolOutlined, TranslationOutlined, UserOutlined } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
function Nav() {
    const loca = useLocation();
    const arr = [];
    if(loca){
        const a = loca.pathname.split('/')
        arr.push("/"+ a[1])
    }
    const { style , skin} = useSkin();
    const Navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        Navigate(e.key);
    };
    const bg: CSSProperties ={
        background:'#bae0ff'
    }
    const items: MenuItem[] = [
        getItem('Chi Nhánh', '/department' , <GroupOutlined />),
        getItem('Loại Sản Phẩm', '/category' , <AppstoreOutlined />),
        getItem('Sản Phẩm', '/product' , <ProductOutlined />),
        getItem('Giao dịch', '/translation', <TranslationOutlined/>, [
            getItem('Nhập hàng', '/translation/inventory' , <DiffOutlined />),
        ]),
        getItem('Đơn Hàng', '/order' , <ShoppingOutlined />),
        getItem('Giảm Giá', '/promotion', <TagOutlined />),
        getItem('Bảo Hành', '/guaranty' , <ToolOutlined />),
        getItem('Người Dùng', '/user' , <UserOutlined />),
        getItem('Dashboard', '/', <PieChartOutlined />),
    ];
    return (
        <Menu  onClick={onClick} style={ skin === 'light' ? bg:  style} mode='horizontal' selectedKeys={arr} items={items} />
    );
}

export default Nav;
