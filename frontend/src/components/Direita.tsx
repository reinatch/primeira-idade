import React, { useEffect } from 'react'
import MovieList from './MovieList'
// import useMovieStore from '@/store/store';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { Movie } from '@/types';
// export { getServerSideProps } from "@/store/store";

const Direita = ({ filmes }: { filmes: Movie[] }) => {
  // const { filteredMovie } = useMovieStore((state) => ({
  //   filteredMovie: state.filteredMovie,
  // }));
      // Function to chunk and flatten the filtered movie array
      const chunkArray = (arr: any[], size: number) => {
        return _.chunk(arr, size);
      }

        // Function to chunk and flatten the filtered movie array
        const chunkedArray = chunkArray(filmes, 3);
    
        // Separate the chunks into different arrays
        const array1: any[] = [];
        const array2: any[] = [];
        chunkedArray.forEach((chunk, index) => {
          if (chunk.length >= 2) {
            array1.push(chunk[0], chunk[1]);
        }
        if (chunk.length >= 3) {
            array2.push(chunk[2]);
        }
          
        });
    
        console.log(array2,'dir')
         const anim = (variants:any)=>{
        return{
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        }
    }

    const slideRight = {
        initial: {
            x:'100vw',
            transition:{
              duration:.5
          }
        },
        enter:{
            x: '0',
            transition:{
              duration:.5
          }
        },
        exit: {
            x:'100vw',
            transition:{
              duration:.5
          }
        }
    }
  return (
    <motion.div key={'direita'} {...anim(slideRight)} className='w-1/3 absolute right-0 h-screen '>
          <div className="grid grid-cols-1 gap-0">

          <MovieList data={array2}/>
          </div>
    </motion.div>
  )
}

export default Direita
