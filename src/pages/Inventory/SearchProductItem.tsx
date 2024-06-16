/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from '@/hooks';
import {  Input, Popover } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, {  SetStateAction, useEffect, useRef } from 'react';
import { ProductItemSearch } from '@/type';
import {  useNavigate } from 'react-router-dom';
import ProductItemCard from '@/conponents/ProductItemCard';
import useNotification from '@/hooks/useNotification';
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
    const [data, setData] = React.useState<ProductItemSearch[]>();
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 1000 });
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            navigate(`/product/${value}`);
        }
        if (info?.source == 'clear') {
            setData([]);
        }
    };
    const onChangeInput: SearchProps['onChange'] = (value) => {
        setSearchValue(value.target.value);
    };
    useEffect(() => {
        const Search = async () => {
            if (debounce != '') {
                const result = await productServices.searchProductItemBySeo(debounce ,type);
                console.log(result)
                setData(result);
            }
        };
        Search();
    }, [debounce]);
    return (
        <>
            <div>
                {contextHolder}
                <Popover
                    content={
                        <div className='popover-search'>
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
