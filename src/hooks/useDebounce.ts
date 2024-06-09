import React ,{ useEffect } from "react";
const useDebounce:React.FC<{value:string,deplay:number}> = ({value,deplay}) : string=> {
    const [debounceValue,setDebounceValue] = React.useState<string>(value)
    useEffect(()=>{
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, deplay);
        return ()=> clearTimeout(handler)
    },[value])
    return debounceValue;
}

export default useDebounce;