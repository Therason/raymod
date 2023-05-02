import connect from '@/lib/db'
import { useEffect } from 'react'
import styles from '@/styles/Gallery.module.css'
import Image from 'next/image'

// TODO: better typing :(
export default function Gallery({ images }: any) {
  return (
    <>
      <main className={styles.main}>
        {images.map((image: any) => {
          return (
            <div key={image._id} className={styles.image_container}>
              <Image src={image.url} alt={image.description} fill />
            </div>
          )
        })}
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
  console.log(images)
  return { props: { images }}
}