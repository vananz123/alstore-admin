import { ProductItemSearch } from '@/type';
import { useCallback, useEffect } from 'react';
type TemoranySaveInventory = 'import' | 'export';
import { useImmer } from 'use-immer';
interface TemoranySaveType{
    name:string;
    items:ProductItemSearch[]
}
function useTemoranySave(type: TemoranySaveInventory) {
    const [data, setData] = useImmer<Array<TemoranySaveType>>([]);
    const temporanySaveImport = localStorage.getItem('temporanySaveImport');
    const temporanySaveExport = localStorage.getItem('temporanySaveExport');
    const setListProduct = useCallback(
        (listProductItem: ProductItemSearch[], name?:string) => {
            if (type === 'import') {
                const item:TemoranySaveType = {
                    name:name ? name : `Lưu tạm ${data.length+1}`,
                    items:listProductItem
                }
                setData((draft) => {
                    draft.push(item);
                });
                Storage(temporanySaveImport, 'temporanySaveImport', item);
            }
            if (type === 'export') {
                const item:TemoranySaveType = {
                    name:name ? name : `Lưu tạm ${data.length+1}`,
                    items:listProductItem
                }
                setData((draft) => {
                    draft.push(item);
                });
                Storage(temporanySaveExport, 'temporanySaveExport', item);
            }
        },
        [type, setData, temporanySaveExport, temporanySaveImport,data.length],
    );
    const removeItemProduct = useCallback(
        (index: number) => {
            if (type === 'import') {
                setData((draft) => {
                    draft.splice(index, 1);
                });
                removeStorageItem(temporanySaveImport, 'temporanySaveImport', index);
            }
            if (type === 'export') {
                setData((draft) => {
                    draft.splice(index, 1);
                });
                removeStorageItem(temporanySaveExport, 'temporanySaveExport', index);
            }
        },
        [type, setData, temporanySaveExport, temporanySaveImport],
    );
    const optionTemoranySave = [{ label: `Chọn bản lưu tạm-(NONE)`, value: -1 }];
    if (type === 'import') {
        if (temporanySaveImport !== null) {
            const arrParse: Array<TemoranySaveType> = JSON.parse(temporanySaveImport);
            for (let i = 0; i < arrParse.length; i++) {
                const item = {
                    label: arrParse[i].name,
                    value: i,
                };
                optionTemoranySave.push(item);
            }
        }
    }
    if (type === 'export') {
        if (temporanySaveExport !== null) {
            const arrParse: Array<TemoranySaveType> = JSON.parse(temporanySaveExport);
            for (let i = 0; i < arrParse.length; i++) {
                const item = {
                    label: arrParse[i].name,
                    value: i,
                };
                optionTemoranySave.push(item);
            }
        }
    }
    useEffect(() => {
        if (temporanySaveImport !== null && type === 'import') {
            const arrParse: Array<TemoranySaveType> = JSON.parse(temporanySaveImport);
            setData(arrParse);
        }
        if (temporanySaveExport !== null && type === 'export') {
            const arrParse: Array<TemoranySaveType> = JSON.parse(temporanySaveExport);
            setData(arrParse);
        }
    }, [type, setData, temporanySaveExport, temporanySaveImport]);
    return { data: data, generateOption: optionTemoranySave, setListProduct, removeItemProduct };
}
const removeStorageItem = (storageData: string | null, storageName: string, index: number) => {
    if (storageData != null) {
        const listProductStringifyOld: Array<TemoranySaveType> = JSON.parse(storageData);
        listProductStringifyOld.splice(index, 1);
        if (listProductStringifyOld.length <= 0) {
            localStorage.removeItem(storageName);
        } else {
            localStorage.setItem(storageName, JSON.stringify(listProductStringifyOld));
        }
        return listProductStringifyOld;
    }
};
const Storage = (storageData: string | null, storageName: string, data: TemoranySaveType) => {
    if (storageData == null) {
        const temporanySaveImportArr: Array<TemoranySaveType> = [data];
        localStorage.setItem(storageName, JSON.stringify(temporanySaveImportArr));
        return temporanySaveImportArr;
    } else {
        const listProductStringifyOld: Array<TemoranySaveType> = JSON.parse(storageData);
        listProductStringifyOld.push(data);
        localStorage.setItem(storageName, JSON.stringify(listProductStringifyOld));
        return listProductStringifyOld;
    }
};
export default useTemoranySave;
