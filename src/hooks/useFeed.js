import { useRequest } from './useRequest';

export function useFeed(feed) {
  const { data, error } = useRequest(`/${feed}.json`);

  return {
    storiesIds: data,
    loading: !error && !data,
    error,
  };
}
