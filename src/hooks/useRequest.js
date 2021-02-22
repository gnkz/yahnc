import useSWR from 'swr';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const fetcher = (...args) => fetch(...args).then((data) => data.json());

export function useRequest(path) {
  return useSWR(`${BASE_URL}${path}`, fetcher);
}
