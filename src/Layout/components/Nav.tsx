import React, { CSSProperties } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useSkin } from '@/hooks';
type MenuItem = Required<MenuProps>['items'][number];
import { LIST_NAV_DATA } from './data';
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
    if (loca) {
        const a = loca.pathname.split('/');
        arr.push('/' + a[1]);
    }
    const { style, skin } = useSkin();
    const Navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        Navigate(e.key);
    };
    const bg: CSSProperties = {
        background: '#bae0ff',
    };
    
    const items: MenuItem[] = [];
    LIST_NAV_DATA.forEach((element) => {
        if (element.children) {
            const chir: MenuItem[] = [];
            element.children.forEach((e) => {
                chir.push(getItem(e.label, e.link, e.icon));
            });
            items.push(getItem(element.label, element.link, element.icon, chir));
        } else {
            items.push(getItem(element.label, element.link, element.icon));
        }
    });
    return (
        <Menu
            onClick={onClick}
            style={skin === 'light' ? bg : style}
            mode='inline'
            selectedKeys={arr}
            items={items}
        />
    );
}

export default Nav;
