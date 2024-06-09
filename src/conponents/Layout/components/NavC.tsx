/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/app/feature/category/reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Category } from '@/type';
import React, { SetStateAction, memo, useEffect } from 'react';
import { loadCategories } from '@/app/feature/category/action';
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
type ResponsiveType = 'forMobile' | 'forDesktop';
interface Props {
    type?: ResponsiveType;
    closeDrawer?: SetStateAction<any>;
}
const NavC: React.FC<Props> = memo(({ type = 'forDesktop', closeDrawer }) => {
    const loca = useLocation();
    const arr = [loca.pathname];
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(selectCategories);
    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);
    const renderSubCateItem = (_cate: Category[]) => {
        const arr: MenuItem[] = [];
        _cate.forEach((element: Category) => {
            const item = getItem(element.name, `/product/${element.id}`);
            arr.push(item);
        });
        return arr;
    };
    const renderCateItem = () => {
        const arr: MenuItem[] = [];
        if (data) {
            data.forEach((element: Category) => {
                const item = getItem(
                    <>
                        <span
                            onClick={() => {
                                Navigate(`/product/${element.id}`);
                                handleCloseDrawer();
                            }}
                        >
                            {element.name}
                        </span>
                    </>,
                    `/product/${element.id}`,
                    '',
                    renderSubCateItem(element.subCategory),
                );
                arr.push(item);
            });
        }

        return arr;
    };
    const item: MenuProps['items'] = [...renderCateItem(), getItem('Khuyến mãi', '/product/promotion')];
    const handleCloseDrawer = () => {
        closeDrawer(false);
    };
    const handleClick: MenuProps['onClick'] = (e) => {
        Navigate(`${e.key}`);
        handleCloseDrawer();
    };
    return (
        <>
            {data && (
                <Menu
                    theme={'light'}
                    mode={type === 'forDesktop' ? 'horizontal' : 'inline'}
                    selectedKeys={arr}
                    items={item}
                    style={{ flex: 1, minWidth: 0, marginLeft: 0 }}
                    onClick={handleClick}
                />
            )}
        </>
    );
});
export default NavC;
