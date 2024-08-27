import { useSearchParams } from "react-router-dom";

export default function useSearchParamsActions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParam = (key: string) => {
    return searchParams.get(key);
  };

  const getAllSearchParams = () => {
    return Object.fromEntries(searchParams.entries());
  };

  const deleteSearchParam = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    setSearchParams(params);
  };

  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  const toggleSearchParam = (key: string, value: string) => {
    if (value) {
      setSearchParam(key, value);
    } else {
      deleteSearchParam(key);
    }
  };

  return {
    getSearchParam,
    getAllSearchParams,
    setSearchParam,
    deleteSearchParam,
    toggleSearchParam,
  } as const;
}
