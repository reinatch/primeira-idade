import { create } from 'zustand'
import createMovieSlice from './slices/movieSlice'
import { Movie } from '@/types';

const useStore = create<any>()((...a) => ({
  ...createMovieSlice(...a)
}))
export default useStore;