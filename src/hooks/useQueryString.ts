import { useSearchParams } from 'react-router-dom';
const useQueryString = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const spo = Object.fromEntries([...searchParams]);
    const setQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        setSearchParams(params.toString());
    };
    const removeQueryString = (name:string) => {
        const param = searchParams.get(name);
    
        if (param) {
          // 👇️ Delete each query param
          searchParams.delete(name);
    
          // 👇️ Update state after
          setSearchParams(searchParams);
        }
      };
    return { queryString: spo, setQueryString ,removeQueryString};
};

export default useQueryString;
