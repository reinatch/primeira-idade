import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovieList'
import React from 'react'

const index = () => {
    const {data: movies = []} = useMovieList()
  return (
    <div>
      <MovieList data={movies}/>
    </div>
  )
}

export default index
