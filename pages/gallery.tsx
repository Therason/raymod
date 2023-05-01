import connect from "@/lib/db"
import { useEffect } from "react";

export default function Gallery({ images }: any) {
  useEffect(() => console.log(images), [])
  return (
    <>
      <main>

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