import { useRequest } from './useRequest';

export function useUser(username) {
  const { data, error } = useRequest(`/user/${username}.json`);

  return {
    user: data,
    loading: !error && !data,
    error,
  };
}
