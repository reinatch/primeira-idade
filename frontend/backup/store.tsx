import { useState, useMemo, createContext, useContext } from "react";
import { Movie } from '@/types';
import Client from '@/libs/client'

export async function getServerSideProps() {
  try {
    const resp = await fetch(`${Client}/api/filmes/`);
    const movies = await resp.json();
    return {
      props: {
        movies: movies || [], // Ensure movies is an array
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        movies: [], // Provide an empty array if fetching fails
      },
    };
  }
}


const useMoviesController = (movies: Movie[]) => {
  const [filter, setFilter] = useState("");

  const filteredMovies = useMemo(
    () =>
      movies.filter((p) =>
        p?.title
      ),
    [filter, movies]
  );

  return {
    filter,
    setFilter,
    movies: filteredMovies,
  };
};

const MoviesContext = createContext<ReturnType<typeof useMoviesController>>({
  filter: "",
  setFilter: () => {},
  movies: [],
});

export const MoviesProvider = ({ movies = [] , children }: any) => (
  <MoviesContext.Provider value={useMoviesController(movies)}>
    {children}
  </MoviesContext.Provider>
);

export const useMovies = () => useContext(MoviesContext);