import React, { CSSProperties } from 'react';
interface CardSkeletonProps {
    className?:string;
    style?:CSSProperties;
}

const SkeletonCard: React.FC<CardSkeletonProps> = ({className,style}) => {
    return (
        <div className={`skeleton  ${className}`} style={style}>
        </div>
    );
};

export default SkeletonCard;