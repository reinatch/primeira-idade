import Image from 'next/image'
import {Navbar} from '@/components/navbar'
import Animation from '@/components/Animation'
import Intro from '@/components/Intro'
// import MovieList from '@/components/MovieList'
// import useMovieList from '@/hooks/useMovieList';

import  {useMovieStore}  from "@/store/store";
// export { getServerSideProps } from "@/store/store";


// import useStore from '@/store/useStore'
import { useEffect } from 'react';
import Esquerda from '@/components/Esquerda';
import Direita from '@/components/Direita';
import Layout from '@/components/Layout';



export default function Home() {
  const {movies, filter, filteredMovie, setFilter, fetchMovies } = useMovieStore((state: any) => state);

  // useEffect(() => {
  //   useMovieStore.getState().setMovie(movies);
  // }, [movies]);
  // console.log(movies)
  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts
  }, []);
  /*hooks*/
  // const {data: movies = [] } = useMovieList();
  // console.log(movies)
  
  /*zustand*/
  // const loadMovies = useStore(state=>state.loadMovies);
  // const movies = useStore(state=>state.movies);
  
  // useEffect(()=>{
  //   loadMovies()
  // }, [])
  
  console.log(movies,filter,filteredMovie)

  return (
    <>
<Layout>

    <div className='h-full'>
    <div className='absolute z-20 w-full h-screen'>

    {/* <Esquerda/>
    <Direita/> */}
    </div>
    {/* <Navbar/> */}
    <Intro/>
    {/* <MovieList data= {movies}/> */}
    </div>
</Layout>
    </>
    
     
)
}



{/* <video-background
      :src="
        'https://www.dropbox.com/s/fajwd1m690d0aoq/FANTASMASbitrate50.mp4?dl=0&raw=1'
      "
      :poster="
        'https://www.dropbox.com/s/lvkd99p5achgbg8/FANTASMAS.jpg?dl=0&raw=1'
      "
      :sources="[
        {
          src:
            'https://www.dropbox.com/s/fajwd1m690d0aoq/FANTASMASbitrate50.mp4?dl=0&raw=1',
          res: 900,
          autoplay: true
        },
        {
          src: 'https://www.dropbox.com/s/tg1il6dnek34io5/Ruby1.mp4',
          res: 638,
          autoplay: true,
          poster: '<your-mobile-background-image-path>.png'
        }
      ]"
      style="max-height: 100vh; height: 100vh;"
      transition=""
    >
    </video-background> */}
