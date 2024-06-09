/* eslint-disable @typescript-eslint/no-explicit-any */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import React, { SetStateAction } from 'react';
interface Props {
    quantity: number;
    stock: number;
    setQuantity: SetStateAction<any>;
}
const InputQuatity: React.FC<Props> = ({ quantity, stock, setQuantity }) => {
    const increase = () => {
        const quan = quantity + 1;
        if (quan <= stock) {
            setQuantity(quan);
        }
    };
    const decline = () => {
        let newCount = quantity - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setQuantity(newCount);
    };
    return (
        <div>
            <Space.Compact>
                <Button
                    onClick={() => {
                        decline();
                    }}
                    icon={<MinusOutlined />}
                />
                <InputNumber style={{ width: '70px' }} min={1} max={stock} value={quantity} />

                <Button
                    onClick={() => {
                        increase();
                    }}
                    icon={<PlusOutlined />}
                />
            </Space.Compact>
        </div>
    );
};

export default InputQuatity;
