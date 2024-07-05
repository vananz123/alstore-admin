import { OptionPrice, OptionBase, OptionSort } from '@/type';
import { SelectProps, TablePaginationConfig } from 'antd';
export const FORM_ITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

export const TAIL_FORM_ITEM_LAYOUT = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 18,
            offset: 6,
        },
    },
};
export const OPTIONS_STATUS = [
    {
        value: 0,
        label: 'InActive',
        color: 'green',
    },
    {
        value: 1,
        label: 'Active',
        color: 'gold',
    },
    {
        value: 2,
        label: 'UnActive',
        color: 'red',
    },
];

export const OPTIONS_STATUS_WARRANTY = [
    {
        value: 0,
        label: 'InProgress',
        color: 'gold',
    },
    {
        value: 1,
        label: 'Success',
        color: 'green',
    },
    {
        value: 2,
        label: 'Cancel',
        color: 'red',
    },
];
export const OPTIONS_STATUS_INVENTORY = [
    {
        value: 0,
        label: 'InProccess',
        color: 'gold',
    },
    {
        value: 1,
        label: 'Successed',
        color: 'green',
    },
    {
        value: 2,
        label: 'Canceled',
        color: 'red',
    },
];
export const OPTIONS_PRODUCT_STATUS = [
    {
        value: 0,
        label: 'InActive',
        color: 'green',
    },
    {
        value: 1,
        label: 'Active',
        color: 'gold',
    },
    {
        value: 2,
        label: 'New',
        color: 'green',
    },
    {
        value: 3,
        label: 'Hot',
        color: 'green',
    },
    {
        value: 4,
        label: 'Sale',
        disabled: false,
        color: 'green',
    },
    {
        value: 5,
        label: 'UnActive',
        color: 'red',
    },
];
export const FILTERS_ROLES = [
    {
        value: 'super-admin',
        text: 'super-admin',
    },
    {
        value: 'admin',
        text: 'admin',
    },
    {
        value: 'sale',
        text: 'sale',
    },
    {
        value: 'customer',
        text: 'customer',
    },
];
export const FILTERS_PRODUCT_STATUS = [
    {
        value: 0,
        text: 'InActive',
    },
    {
        value: 1,
        text: 'Active',
    },
    {
        value: 2,
        text: 'New',
    },
    {
        value: 3,
        text: 'Hot',
    },
    {
        value: 4,
        text: 'Sale',
    },
    {
        value: 5,
        text: 'UnActive',
    },
];
export const OPTIONS_PRICE: OptionPrice[] = [
    { label: 'Dưới 2 triệu', value: 1 },
    { label: '2 triệu đến 6 triệu', value: 2 },
    { label: '6 triệu đến 10 triệu', value: 3 },
    { label: 'Trên 10 triệu', value: 4 },
];
export const OPTIONS_MATERIAL: OptionBase[] = [
    { label: 'AL', value: 'AL' },
    { label: 'ROLEX', value: 'ROLEX' },
    { label: 'PNJ', value: 'PNJ' },
    { label: 'Seiko', value: 'Seiko' },
];
export const OPTIONS_SORT: OptionSort[] = [
    {
        value: 'ascending',
        label: 'Giá tăng dần',
    },
    {
        value: 'descending',
        label: 'Giá giảm dần',
    },
];

import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
export const editorConfiguration = {
    plugins: [
        Autoformat,
        BlockQuote,
        Bold,
        FontSize,
        FontColor,
        FontFamily,
        FontBackgroundColor,
        CloudServices,
        Essentials,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        Indent,
        Italic,
        Link,
        List,
        Paragraph,
        PasteFromOffice,
        Table,
        TableToolbar,
        TextTransformation,
        Undo,
    ],
    toolbar: {
        items: [
            'heading',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ],
    },
    language: 'en',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
};
export const OPTIONS_SKU: SelectProps['options'] = [
    {
        value: 'cm',
        label: 'CM',
    },
    {
        value: 'size',
        label: 'Size',
    },
];
export const OPTIONS_PROMOTION_TYPE = [
    { label: 'percentage', value: 'percentage' },
    { label: 'fixed', value: 'fixed' },
];
export const STATUS_ORDER = [
    {
        key: 'Đang xử lý',
        label: 'Đang xử lý',
    },
    {
        key: 'Đã tiếp nhận',
        label: 'Đã tiếp nhận',
    },
    {
        key: 'Đã hoàn thành',
        label: 'Đã hoàn thành',
    },
    {
        key: 'Đã hủy',
        label: 'Đã hủy',
    },
    {
        key: 'Trả hàng',
        label: 'Trả hàng',
    },
];
export const OPTIONS_SHIPPING = [
    {
        value: 'Giao hàng tận nơi',
        text: 'Giao hàng tận nơi',
    },
    {
        value: 'Nhận hàng cửa hàng',
        text: 'Nhận hàng cửa hàng',
    },
];
export const OPTIONS_TYPE_INVENTORY = [
    {
        value: 'import',
        text: 'import',
    },
    {
        value: 'export',
        text: 'export',
    },
];
export const PAPINATION: TablePaginationConfig = { position: ['bottomLeft'], pageSize: 10 };
