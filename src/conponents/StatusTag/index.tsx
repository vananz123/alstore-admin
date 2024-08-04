import { Tag } from 'antd';
import React from 'react';
interface DefaultOptions {
    value: number;
    label: string;
    color: string;
}
const StatusTag: React.FC<{ status: number; options: DefaultOptions[] }> = ({ status, options }) => {
    const renderTag = () => {
        const option = options?.find((x: DefaultOptions) => x.value === status);
        return <Tag color={option?.color}>{option?.label}</Tag>;
    };
    return <div>{renderTag()}</div>;
};

export default StatusTag;
