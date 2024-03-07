import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovie = (slug?: string) => {
  const { data, error, isLoading } = useSwr( slug ? `/api/movies/${slug}`: null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  console.log(data, 'hook')
  console.log(slug, 'hook')
  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;