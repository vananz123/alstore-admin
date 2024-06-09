/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Select, Spin } from 'antd';
import * as userServices from '@/api/userServices';
import * as addressGHTKServices from '@/api/addressGHTKServices';
import type { SelectProps } from 'antd';
import { StatusForm } from '@/type';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Address, addressGHTK } from '@/api/ResType';
import type { TypeFormAddress } from '@/pages/Purchase';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
interface Props {
    typeForm: TypeFormAddress | undefined;
    address: Address | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}
const AddressForm: React.FC<Props> = ({ typeForm, address, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    const [province, setProvince] = React.useState<addressGHTK[]>([]);
    const [district, setDistrict] = React.useState<addressGHTK[]>([]);
    const [optionsProvince, setOptionsProvince] = React.useState<SelectProps['options']>();
    const [optionsDistrict, setOptionsDistrict] = React.useState<SelectProps['options']>();
    const [optionsWard, setOptionsWard] = React.useState<SelectProps['options']>();
    const user = useAppSelector(selectUser).data;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Address>['onFinish'] = async (values) => {
        if (typeof user !== 'undefined') {
            setIsLoading(true);
            setContext('');
            if (typeof address === 'undefined') {
                if (typeForm == 'ADD') {
                    values.userId = user.id;
                    const res = await userServices.addAddress(values);
                    if (res.statusCode === 200) {
                        onSetState(res.resultObj);
                        const status: StatusForm = 'success';
                        onSetStatus(status);
                    } else {
                        const status: StatusForm = 'error';
                        onSetStatus(status);
                    }
                }
                setIsLoading(false);
                setContext('Save');
            } else {
                if (typeForm == 'EDIT') {
                    values.province = address.province;
                    values.userId = user.id;
                    values.id = address.id;
                    const res = await userServices.updateAddress(values);
                    if (res.statusCode === 201) {
                        onSetState(res.resultObj);
                        const status: StatusForm = 'success';
                        onSetStatus(status);
                    } else {
                        const status: StatusForm = 'error';
                        onSetStatus(status);
                    }
                }
                setIsLoading(false);
                setContext('Save');
            }
        }
    };
    const onFinishFailed: FormProps<Address>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChangeProvince = (value: string) => {
        const provi = province?.find((s) => s.name == value);
        const getAllDistrict = async () => {
            const res = await addressGHTKServices.getAllDistrict(Number(provi?.id));
            if (res.isSuccessed === true) {
                console.log(res.resultObj);
                setOptionsDistrict(GeneratorSelectOption(res.resultObj));
                setDistrict(res.resultObj);
            }
        };
        getAllDistrict();
    };
    const handleChangeDistrict = (value: string) => {
        const dis = district?.find((s) => s.name == value);
        const getAllWard = async () => {
            const res = await addressGHTKServices.getAllWard(Number(dis?.id));
            if (res.isSuccessed === true) {
                setOptionsWard(GeneratorSelectOption(res.resultObj));
            }
        };
        getAllWard();
    };
    const GeneratorSelectOption = (data: addressGHTK[]): SelectProps['options'] => {
        const options: SelectProps['options'] = [];
        data.forEach((element: addressGHTK) => {
            options.push({
                value: element.name,
                label: element.name,
            });
        });
        return options;
    };
    useEffect(() => {
        const getAllProvince = async () => {
            setIsLoading(true);
            const res = await addressGHTKServices.getAllProvince();
            if (res.isSuccessed === true) {
                setOptionsProvince(GeneratorSelectOption(res.resultObj));
                setProvince(res.resultObj);
                if (address != undefined && typeForm == 'EDIT') {
                    const provi = res.resultObj.find((x: addressGHTK) => x.name == address.province);
                    const resDis = await addressGHTKServices.getAllDistrict(Number(provi?.id));
                    if (resDis.isSuccessed === true) {
                        setDistrict(resDis.resultObj);
                        setOptionsDistrict(GeneratorSelectOption(resDis.resultObj));
                        const ward = resDis.resultObj.find((x: addressGHTK) => x.name == address.urbanDistrict);
                        const resW = await addressGHTKServices.getAllWard(Number(ward?.id));
                        if (resW.isSuccessed === true) {
                            setOptionsWard(GeneratorSelectOption(resW.resultObj));
                            setIsLoading(false);
                        }
                    }
                    form.setFieldsValue(address);
                } else {
                    form.setFieldValue('streetNumber', '');
                    form.setFieldValue('phoneNumber', '');
                    form.setFieldValue('wardCommune', 'Chọn Xã/Phường');
                    form.setFieldValue('urbanDistrict', 'Chọn Quận/Huyện');
                    form.setFieldValue('province', 'Chọn Tỉnh/Thành phố');
                    setIsLoading(false);
                }
            }
        };
        getAllProvince();
    }, [form,typeForm, address]);
    return (
        <Spin spinning={isLoading}>
            <Form
                {...FORM_ITEM_LAYOUT}
                form={form}
                name="productFrom"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item<Address>
                    name="province"
                    label="Tỉnh/Thành Phố"
                    initialValue={address?.province || 'Chọn Tỉnh/ Thành Phố'}
                    rules={[{ required: true, message: 'Chọn Tỉnh/Thành Phố!' }]}
                >
                    <Select
                        disabled={typeForm == 'EDIT'}
                        style={{ width: 200 }}
                        onChange={handleChangeProvince}
                        options={optionsProvince}
                    />
                </Form.Item>
                <Form.Item<Address>
                    name="urbanDistrict"
                    label="Quận/ Huyện"
                    initialValue={address?.urbanDistrict || 'Chọn Quận/ Huyện'}
                    rules={[{ required: true, message: 'Chọn Quận/Huyện!' }]}
                >
                    <Select style={{ width: 200 }} onChange={handleChangeDistrict} options={optionsDistrict} />
                </Form.Item>
                <Form.Item<Address>
                    name="wardCommune"
                    label="Xã/Phường"
                    initialValue={address?.wardCommune || 'Chọn Xã/Phường'}
                    rules={[{ required: true, message: 'Chọn Xã/Phường!' }]}
                >
                    <Select style={{ width: 200 }} options={optionsWard} />
                </Form.Item>
                <Form.Item<Address>
                    name="streetNumber"
                    label="Số Đường"
                    rules={[{ required: true, message: 'Chọn Số Đường!', whitespace: true }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item<Address>
                    name="phoneNumber"
                    label="Phone number"
                    initialValue={''}
                    rules={[{ required: true, message: 'Please input Phone number!', whitespace: true }]}
                >
                    <Input value={address?.phoneNumber} />
                </Form.Item>
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};
export default AddressForm;
