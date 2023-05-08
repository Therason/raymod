import connect from '@/lib/db'
import { useEffect } from 'react'
import styles from '@/styles/Gallery.module.css'
import Image from 'next/image'
import BigWindow from '@/components/bigWindow'

// TODO: better typing :(
export default function Gallery({ images }: any) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          {images.map((image: any) => {
            return (
              // <div key={image._id} className={styles.image}>
              //   <Image src={image.url} alt={image.alt || ''} fill />
              //   <p>{image.description}</p>
              // </div>
              <BigWindow image={image} key={image._id}/>
            )
          })}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const conn = await connect();
  const db = conn.db();
  const images = (await db.collection('posts').find({}).sort({_id: -1}).toArray()).map((document) => {
    return {
      ...document,
      _id: document._id.toString()
    }
  });
  conn.close()
  return { props: { images }}
}