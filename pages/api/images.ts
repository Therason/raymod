import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(422).json({ message: "Route not valid" })
  }

  try {
    // fetch docs from DB
    const conn = await connect()
    const db = conn.db()
    const images = (await db.collection('posts').find({}).sort({position: -1}).toArray()).map((document) => {
      return {
        ...document,
        _id: document._id.toString()
      }
    })
    conn.close()
    return res.status(200).json({ images })
  } catch(e) {
    return res.status(500).json({ message: 'internal server error...' })
  }
}