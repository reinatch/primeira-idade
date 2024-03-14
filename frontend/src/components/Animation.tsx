import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
type Props = {
  children?: ReactNode;
};
const Animation = ({ children }: Props) => {
    const anim = (variants:any)=>{
        return{
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        }
    }
    const opacity = {
        initial: {
            opacity:0
        },
        enter:{
            opacity: 1,
            transition:{
                duration:0.5
            }
        },
        exit: {
            opacity:1
        }
    }
    const slideLeft = {
        initial: {
            x:'-100vw'
        },
        enter:{
            x: '0',
            transition:{
                duration:0.5
            }
        },
        exit: {
            x:'-100vw'
        }
    }

  return (
    <motion.div {...anim(slideLeft)} className='page'>
      {children}
    </motion.div>
  )
}

export default Animation
