/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from '@/hooks';
import {  Input, Popover } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, {  SetStateAction, useRef } from 'react';
import { ProductItemSearch } from '@/type';
import {  useNavigate } from 'react-router-dom';
import ProductItemCard from '@/conponents/ProductItemCard';
import useNotification from '@/hooks/useNotification';
import { useQuery } from '@tanstack/react-query';
interface Props{
    className?:string;
    listProductItem:ProductItemSearch[];
    onSetList:SetStateAction<any>;
    type?:string;
}
const SearchProductItem: React.FC<Props> = ({className, onSetList , listProductItem , type}) => {
    const { Search } = Input;
    const [searchValue, setSearchValue] = React.useState('');
    const {contextHolder,openNotification} = useNotification()
    const navigate = useNavigate();
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 1000 });
    const {data ,isLoading} = useQuery({
        queryKey:['search-product-item',debounce],
        queryFn:()=> productServices.searchProductItemBySeo(debounce ,type),
        enabled:debounce != ''
    })
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            navigate(`/product/${value}`);
        }
        if (info?.source == 'clear') {
           // setData([]);
        }
    };
    const onChangeInput: SearchProps['onChange'] = (value) => {
        setSearchValue(value.target.value);
    };
    return (
        <>
            <div>
                {contextHolder}
                <Popover
                    content={
                        <div className='max-h-[500px] overflow-y-auto'>
                            {data && data.length > 1 ? (
                                <>
                                    {data.map((e: ProductItemSearch) => (
                                        <div className='mb-2 cursor-pointer' key={e.id} onClick={()=>{
                                            const productCheck = listProductItem.find( s => s.id ===e.id)
                                            if(productCheck === undefined){
                                                onSetList((value:any) =>([...value, e]))
                                            }else{
                                                openNotification('error', `Đã tồn tại ${e.seoTitle} ${e.value}`)
                                            }
                                        }}>
                                            <ProductItemCard productItem={e}/>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center' }}>Not found</div>
                            )}
                        </div>
                    }
                    title={'Tìm kiếm'}
                    trigger={'click'}
                    placement='bottomLeft'
                >
                    <div className={`${className}`}>
                        <Search
                            placeholder="Tên sản phẩm"
                            className='block'
                            allowClear
                            loading={isLoading}
                            autoFocus={false}
                            ref={inputRef}
                            size="middle"
                            onSearch={onSearch}
                            onChange={onChangeInput}
                        />
                    </div>
                </Popover>
            </div>
        </>
    );
};
export default SearchProductItem;
