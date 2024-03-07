import React from 'react'
import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router'

const Page = () => {
    const router = useRouter();
    const {slug} = router.query;
    const {data} = useMovie(slug as string);
    console.log(data, 'page')
  return (
    <div>
      
    </div>
  )
}

export default Page
