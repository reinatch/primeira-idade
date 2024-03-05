import Image from 'next/image'
import {Navbar} from '../components/navbar'


export default function Home() {
  return (
    <>
    
    <Navbar/>
    <div className=' overflow-hidden h-screen w-screen'>


    <video className='absolute w-full h-full object-cover -z-1'  src={'https://www.dropbox.com/s/fajwd1m690d0aoq/FANTASMASbitrate50.mp4?dl=0&raw=1'} autoPlay/>
    </div>
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
