import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovies = () => {
  const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
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

export default useMovies;