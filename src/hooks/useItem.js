import { useRequest } from './useRequest';

export function useItem(id) {
  const { data, error } = useRequest(`/item/${id}.json`);

  return {
    item: data,
    loading: !error && !data,
    error,
  };
}
