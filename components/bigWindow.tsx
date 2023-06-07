import styles from '@/styles/BigWindow.module.css'
import Image from 'next/image'
import CloseIcon from './closeIcon'
import { motion } from 'framer-motion'

const variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring'
    }
  }
}

export default function BigWindow({image}: {image: any}) {
  return (
    <motion.div className={`border ${styles.container}`} variants={variants}>
      <span className={styles.bar}>
        <CloseIcon handleClick={() => {}} background='#eddcd1' />
      </span>
      <div className={styles.content}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src={image.url} alt={image.alt || ''} className={styles.image} fill style={{ objectFit: 'contain' }} />
        </div>
        <div className={styles.info}>
          <p>{image.description}</p>
        </div>
      </div>
    </motion.div>
  )
}