import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/lib/db'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(422).json({ message: 'Route not valid' })
    return
  }
  
  const images = JSON.parse(req.body)
  const conn = await connect()
  const db = conn.db()
  for (let i = 0; i < images.length; i++) {
    if (images[i].position !== images.length - 1 - i) {
      console.log(images[i])
      await db.collection('posts').findOneAndUpdate(
        { _id: new ObjectId(images[i]._id) }, 
        {
          $set: { position: images.length - 1 - i }
        }
      )
    }
  }
  
  conn.close()
  res.json({ message: 'coooool' })
}