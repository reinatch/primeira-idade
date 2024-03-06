import React from 'react';

import { MovieInterface } from '@/types';
// import MovieCard from '@/components/MovieCard';
import  isEmpty  from 'lodash';
import { Navbar } from './navbar';

interface MovieListProps {
  data: MovieInterface[];
}

const MovieList: React.FC<MovieListProps> = ({ data}) => {
  // if (isEmpty(data)) {
  //   return null;
  // }

  return (
    <>
    <Navbar/>
    <div className="px-4 mt-4 space-y-8 md:px-12">
      <div>
        <p className="mb-4 font-semibold text-black text-md md:text-xl lg:text-2xl">MOvies</p>
        <div className="grid grid-cols-3 gap-0">
          {data.map((movie) => (
            // <MovieCard key={movie.id} data={movie} />
            <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default MovieList;