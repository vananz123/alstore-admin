import { ProductItemSearch } from '@/type';
import React, { useCallback, useEffect } from 'react';
type TemoranySaveInventory = 'import' | 'export';
function useTemoranySave(type: TemoranySaveInventory) {
    const [data, setData] = React.useState<Array<ProductItemSearch[]>>([]);
    const optionTemoranySave = [{ label: `Chọn bản lưu tạm-(NONE)`, value: -1 }];
    const temporanySaveImport = localStorage.getItem('temporanySaveImport');
    const temporanySaveExport = localStorage.getItem('temporanySaveExport');
    const setListProduct = useCallback(
        (listProductItem: ProductItemSearch[]) => {
            if (type === 'import') {
                const resulf = Storage(temporanySaveImport, 'temporanySaveImport', listProductItem);
                setData(resulf);
            }
            if (type === 'export') {
                const resulf = Storage(temporanySaveExport, 'temporanySaveExport', listProductItem);
                setData(resulf);
            }
        },
        [temporanySaveImport, type, temporanySaveExport],
    );
    const removeItemProduct = useCallback(
        (index: number) => {
            if (type === 'import') {
                const resulf = removeStorageItem(temporanySaveImport, 'temporanySaveImport', index);
                setData(resulf ? resulf : []);
            }
            if (type === 'export') {
                const resulf = removeStorageItem(temporanySaveExport, 'temporanySaveExport', index);
                setData(resulf ? resulf : []);
            }
        },
        [temporanySaveImport, temporanySaveExport, type],
    );
    if(temporanySaveImport !== null && type==='import'){
        const arrParse: Array<ProductItemSearch[]> = JSON.parse(temporanySaveImport);
        for (let i = 0; i < arrParse.length; i++) {
            const item = {
                label: `Lưu tạm ${i + 1}`,
                value: i,
            };
            optionTemoranySave.push(item);
        }
    }
    if(temporanySaveExport !== null && type==='export'){
        const arrParse: Array<ProductItemSearch[]> = JSON.parse(temporanySaveExport);
        for (let i = 0; i < arrParse.length; i++) {
            const item = {
                label: `Lưu tạm ${i + 1}`,
                value: i,
            };
            optionTemoranySave.push(item);
        }
    }
    useEffect(() => {
        if (temporanySaveImport !== null) {
            const arrParse: Array<ProductItemSearch[]> = JSON.parse(temporanySaveImport);
            setData(arrParse);
        }
        if (temporanySaveExport !== null) {
            const arrParse: Array<ProductItemSearch[]> = JSON.parse(temporanySaveExport);
            setData(arrParse);
        }
    }, [setListProduct, temporanySaveImport, temporanySaveExport, removeItemProduct]);
    return { data: data, generateOption: optionTemoranySave, setListProduct, removeItemProduct };
}
const removeStorageItem = (storageData: string | null, storageName: string, index: number) => {
    if (storageData != null) {
        const listProductStringifyOld: Array<ProductItemSearch[]> = JSON.parse(storageData);
        listProductStringifyOld.splice(index, 1);
        if (listProductStringifyOld.length <= 0) {
            localStorage.removeItem(storageName);
        } else {
            localStorage.setItem(storageName, JSON.stringify(listProductStringifyOld));
        }
        return listProductStringifyOld;
    }
};
const Storage = (storageData: string | null, storageName: string, listProductItem: ProductItemSearch[]) => {
    if (storageData == null) {
        const temporanySaveImportArr: Array<ProductItemSearch[]> = [];
        const listProductStringify: ProductItemSearch[] = [];
        listProductItem.forEach((e) => {
            listProductStringify.push(e);
        });
        temporanySaveImportArr.push(listProductStringify);
        localStorage.setItem(storageName, JSON.stringify(temporanySaveImportArr));
        return temporanySaveImportArr;
    } else {
        const listProductStringifyOld: Array<ProductItemSearch[]> = JSON.parse(storageData);
        const listProductStringify: ProductItemSearch[] = [];
        listProductItem.forEach((e) => {
            listProductStringify.push(e);
        });
        listProductStringifyOld.push(listProductStringify);
        localStorage.setItem(storageName, JSON.stringify(listProductStringifyOld));
        return listProductStringifyOld;
    }
};
export default useTemoranySave;
