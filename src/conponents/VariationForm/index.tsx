/* eslint-disable @typescript-eslint/no-explicit-any */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
import { SetStateAction } from 'react';
import * as productServices from '@/api/productServices';
import { Product } from '@/type';
import useNotification from '@/hooks/useNotification';
interface Props{
    product:Product;
    open:boolean;
    onSetStateOpen:SetStateAction<any>;
}
const VariationFrom :React.FC<Props> =({product, open ,onSetStateOpen})=> {
    const {contextHolder , openNotification} = useNotification()
    const onFinishVariation = async (values: any) => {
        if (product != undefined) {
            console.log(values);
            const res = await productServices.addVariation(product.id, values.variations);
            if (res.isSuccessed === true) {
              //  onSetState(res.resultObj);
                onSetStateOpen(false);
               openNotification('success', 'Add variation success');
            }
        }
    };
    return (
        <>
        {contextHolder}
            <Drawer title="Create variation" width={600} onClose={() => onSetStateOpen(false)} open={open}>
                <Form
                    {...FORM_ITEM_LAYOUT}
                    name="dynamic_form_nest_item"
                    onFinish={onFinishVariation}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.List name="variations" initialValue={product?.variation}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[{ required: true, message: 'Missing name' }]}
                                        >
                                            <Input placeholder="Name" style={{ width: 220 }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            rules={[{ required: true, message: 'Missing value' }]}
                                        >
                                            <Input placeholder="Value" style={{ width: 220 }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default VariationFrom;
