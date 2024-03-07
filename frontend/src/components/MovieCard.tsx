import React from 'react'
import Client from '@/libs/client'
import { useRouter } from 'next/router';
import Link from 'next/link';

interface MovieCardProps{
    data: Record<string,any>;
}
const MovieCard: React.FC<MovieCardProps> = ({data}) => {
  const router = useRouter()
  return (
    <div className='relative group bg-zinc-900 col-span' >
      {/* onClick={() => router.push(`filmes/${data.id}`)} */}
      <Link href={`filmes/${data.slug}`}>
      
        {data.thumbnail.file &&<img  className='w-full' src={Client + data.thumbnail.file} alt="" /> }
        <div className='absolute z-10 inline-block w-full text-center text-yellow-500 bottom-1'> 
        <p className='leading-tight'>{data.title}</p>
        <p className=''>{data.realizador}</p>
        
        </div>
      </Link>
      
    </div>
  )
}

export default MovieCard
