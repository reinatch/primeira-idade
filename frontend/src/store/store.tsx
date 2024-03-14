// import { useState, useMemo, createContext, useContext } from "react";
// import { Movie } from '@/types';
import Client from '@/libs/client'
// import {create} from "zustand";
//  const useMovieStore = create<{
//   movies: Movie[];
//   setMovie: (movies: Movie[]) => void;
//   filteredMovie: Movie[];
//   movie: any ;
//   filter: string;
//   slug: string;
//   setFilter: (filter: string) => void;
//   getFilter: (slug: string) => void;
// }>((set) => ({
//   movies: [],
//   filteredMovie: [],
//   filter: "",
//   slug: "",
//   movie: null,

//   setMovie: (movies: Movie[]) =>
//     set({ movies, filteredMovie: movies }),
//   setFilter: (filter: string) =>
//     set((state) => ({
//       filter,
//       filteredMovie: filter === '' ? state.movies : state.movies.filter((movies) =>
//         movies.category === filter
//       ),
//     })),
//   getFilter: (slug: string) =>
//     set((state) => ({
//       slug,
//       movie: state.movies.filter((movies) =>
//         movies.slug === slug
//       ),
//     })),
// }));
// export async function getServerSideProps() {
//   const resp = await fetch(`${Client}/api/filmes/`);
  
//   useMovieStore.getState().setMovie(await resp.json());

//   return {
//     props: {
//       movies: useMovieStore.getState().movies,
//     },
//   };
// }

// export default useMovieStore;








import { ReactNode, createContext, useRef, useContext } from 'react'
import { StoreApi, useStore } from 'zustand'
import { Movie } from '@/types';
// store.ts
import { createStore } from 'zustand/vanilla'

// export interface Movie {
//   id: number;
//   title: string;
// }

export interface MovieState {
  movies: Movie[];
  filteredMovie: Movie[];
  filter: string;
  slug: string;
  movie: Movie | null;
}

export interface MovieActions {
    fetchMovies: () => Promise<void>;
    fetchMovie: (slug: string) => Promise<void>;
    setMovie: (movies: Movie[]) => void;
    setFilter: (filter: string) => void;
}

export type MovieStore = MovieState & MovieActions;

export const defaultInitState: MovieState = {
  movies: [],
  filteredMovie: [],
  filter: "",
  slug: "",
  movie: null,
}

export const createMovieStore = (
  initState: MovieState = defaultInitState,
) => {
    return createStore<MovieStore>()((set) => ({
        ...initState,
        fetchMovies: async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/movies`);
            const data = await response.json();
            set({ movies: data });
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        },
        fetchMovie: async (slug: string) => {
          try {
            const response = await fetch(`http://localhost:3000/api/movies/${slug}`);
            const data = await response.json();
            set({ movie: data });
          } catch (error) {
            console.error("Error fetching movie:", error);
          }
        },
        setMovie: (movies: Movie[]) =>
          set({ movies, filteredMovie: movies }),
        setFilter: (filter: string) =>
          set((state) => ({
            filter,
            filteredMovie: filter === '' ? state.movies : state.movies.filter((movie) =>
              movie.category === filter
            ),
          })),

      }))
}

// provider.tsx
// import { createMovieStore, defaultInitState, MovieStore, Movie } from './store'

export const MovieStoreContext = createContext<StoreApi<MovieStore> | null>(
  null,
)

export interface MovieStoreProviderProps {
  children: ReactNode
}

export const MovieStoreProvider = ({
  children,
}: MovieStoreProviderProps) => {
  const storeRef = useRef<StoreApi<MovieStore>>()
  if (!storeRef.current) {
    storeRef.current = createMovieStore(defaultInitState)
  }

  return (
    <MovieStoreContext.Provider value={storeRef.current}>
      {children}
    </MovieStoreContext.Provider>
  )
}

export const useMovieStore = <T,>(
  selector: (store: MovieStore) => T,
): T => {
  const movieStoreContext = useContext(MovieStoreContext)

  if (!movieStoreContext) {
    throw new Error(`useMovieStore must be used within MovieStoreProvider`)
  }

  return useStore(movieStoreContext, selector)
}





























// export async function getServerSideProps() {
//   try {
//     const resp = await fetch(`${Client}/api/filmes/`);
//     const movies = await resp.json();
//     return {
//       props: {
//         movies: movies || [], // Ensure movies is an array
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return {
//       props: {
//         movies: [], // Provide an empty array if fetching fails
//       },
//     };
//   }
// }


// const useMoviesController = (movies: Movie[]) => {
//   const [filter, setFilter] = useState("");

//   const filteredMovies = useMemo(
//     () =>
//       movies.filter((p) =>
//         p?.title
//       ),
//     [filter, movies]
//   );

//   return {
//     filter,
//     setFilter,
//     movies: filteredMovies,
//   };
// };

// const MoviesContext = createContext<ReturnType<typeof useMoviesController>>({
//   filter: "",
//   setFilter: () => {},
//   movies: [],
// });

// export const MoviesProvider = ({ movies = [] , children }: any) => (
//   <MoviesContext.Provider value={useMoviesController(movies)}>
//     {children}
//   </MoviesContext.Provider>
// );

// export const useMovies = () => useContext(MoviesContext);