import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function useToken() {
  const { data, error, isLoading } = useSwr("/api/token", fetcher);

  return {
    token: data?.token,
    isLoading,
    error,
  };
}
