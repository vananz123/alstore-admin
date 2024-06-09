import React from "react";
interface Props{
    children:React.ReactNode;
    className?:string;
}
const Container:React.FC<Props> =({children,className="mt-5 mb-5"}) =>{
    return <div className='w-[100%] grid grid-cols-1 justify-items-center'>
        <div className={`max-w-screen-xl w-full pt-0 p-[16px] sm:px-[30px] ${className}`}>{children}</div>
    </div>;
}

export default Container;