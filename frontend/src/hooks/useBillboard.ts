import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useBillboard = () => {
  const { data, error, isLoading } = useSwr('/api/random', fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useBillboard;