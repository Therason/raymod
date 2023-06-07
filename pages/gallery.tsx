import connect from '@/lib/db'
import styles from '@/styles/Gallery.module.css'
import BigWindow from '@/components/bigWindow'
import { motion } from 'framer-motion'

const variants = {
  hidden: { 
    transition: {
      staggerChildren: 0.1,
    }
  },
  show: {
    transition: {
      staggerChildren: 0.2,
    }
  }
}

// TODO: better typing :(
export default function Gallery({ images }: any) {
  return (
    <>
      <main className={styles.main}>
        <motion.div className={styles.container} variants={variants} initial='hidden' animate='show' exit='hidden'>
          {images.map((image: any) => {
            return (
              <BigWindow image={image} key={image._id}/>
            )
          })}
        </motion.div>
      </main>
    </>
  )
}

// get images from DB
// uses ISR instead of SSR to improve speed
export async function getStaticProps() {
  const conn = await connect();
  const db = conn.db();
  const images = (await db.collection('posts').find({}).sort({position: -1}).toArray()).map((document) => {
    return {
      ...document,
      _id: document._id.toString()
    }
  });
  conn.close()
  return {
    props: { images }
  }
}
