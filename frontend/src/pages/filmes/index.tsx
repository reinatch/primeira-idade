import useMovieList from '@/hooks/useMovieList'
import React, { useEffect, useState } from 'react'
// import { useMovies } from "@/store/store";
// export { getServerSideProps } from "@/store/store";
import  {useMovieStore}  from "@/store/store";
import Intro from '@/components/Intro';
import Direita from '@/components/Direita';
import Esquerda from '@/components/Esquerda';
import { Movie } from '@/types';
import Layout from '@/components/Layout';
// export { getServerSideProps } from "@/store/store";
import Client from '@/libs/client'


  const index = () => {
  //   const { filter } = useMovieStore();
  //   const { data: movies = [] } = useMovieList();
  //   const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  // // console.log(movies, 'filmes')
  // console.log(filter, 'filteredMovie')
  // useEffect(() => {
  //   // Filter movies based on the filter state
  //   const newFilteredMovies = filter === '' ? movies : movies.filter((movie:Movie) => movie.category === filter);
  //   setFilteredMovies(newFilteredMovies);
  // }, [filter, movies]);
  // const {movies, filter, filteredMovie, setFilter } = useMovieStore(((state)=>state));
  const { movies, fetchMovies, filter, filteredMovie, setFilter } = useMovieStore((state: any) => state);

  // useEffect(() => {
  //   useMovieStore.getState().setMovie(movies);
  // }, [movies, ])
  // console.log(movies)
  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts
  }, []);
  return (
    <Layout>
<div className='absolute z-20 w-full h-screen'>

<Esquerda filmes={filteredMovie}/>
<Direita filmes={filteredMovie}/>
</div>
      <div  className='absolute'>
      
      <Intro/>
      </div>
      {/* <MovieList data={filteredMovie}/> */}
    </Layout>
  )
}
// export async function getServerSideProps() {
//   const resp = await fetch(`${Client}/api/filmes/`);
  
//   useMovieStore.getState().setMovie(await resp.json());

//   return {
//     props: {
//       movies: useMovieStore.getState().movies,
//     },
//   };
// }
export default index
