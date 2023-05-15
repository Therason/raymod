import connect from '@/lib/db'
import styles from '@/styles/Gallery.module.css'
import BigWindow from '@/components/bigWindow'

// TODO: better typing :(
export default function Gallery({ images }: any) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          {images.map((image: any) => {
            return (
              <BigWindow image={image} key={image._id}/>
            )
          })}
        </div>
      </main>
    </>
  )
}

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

// export async function getServerSideProps() {
//   const conn = await connect();
//   const db = conn.db();
//   const images = (await db.collection('posts').find({}).sort({position: -1}).toArray()).map((document) => {
//     return {
//       ...document,
//       _id: document._id.toString()
//     }
//   });
//   conn.close()
//   return { props: { images }}
// }