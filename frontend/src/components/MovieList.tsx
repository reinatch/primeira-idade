import React from 'react';

import { MovieInterface } from '@/types';
// import MovieCard from '@/components/MovieCard';
import  isEmpty  from 'lodash';
import { Navbar } from './navbar';
import MovieCard from './MovieCard';

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
    <div className="">
      <div>
        {/* <p className="mb-4 font-semibold text-black text-md md:text-xl lg:text-2xl">Mvies</p> */}
        <div className="grid grid-cols-3 gap-0">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
            // <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default MovieList;