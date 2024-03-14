// import useMovieStore from '@/store/store';
import { motion } from 'framer-motion'
import React from 'react'
import MovieList from './MovieList';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Movie } from '@/types';

const Esquerda = ({ filmes }: { filmes: Movie[] }) => {

  const router = useRouter();
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
      
      // console.log(chunk,index)
    });

    // console.log(array2,'esq')
       const anim = (variants:any)=>{
        return{
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        }
    }

    const slideLeft = {
        initial: {
            x:'-100vw',
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
            x:'-100vw',
            transition:{
              duration:.5
          }
        }
    }
  return (
    <motion.div key={'esquerda'} {...anim(slideLeft)} className='esquerda w-2/3 h-screen absolute'>
          <div className="grid grid-cols-2 gap-0">

          <MovieList data={array1}/>
        </div>
    </motion.div>
  )
}

export default Esquerda
