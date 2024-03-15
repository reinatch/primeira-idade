import React from 'react';

import { Movie } from '@/types';
// import MovieCard from '@/components/MovieCard';
import  isEmpty  from 'lodash';
import { Navbar } from './navbar';
import MovieCard from './MovieCard';

interface MovieListProps {
  data: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ data}) => {
  if (!data || data.length === 0) {
    return <div>No movies found</div>;
  }

  return (
   
          <>
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
            // <div key={movie.id}>{movie.title}</div>
            ))}
            </>
  );
}

export default MovieList;