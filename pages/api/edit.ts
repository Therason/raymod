import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/lib/db'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(422).json({ message: 'Route not valid' })
  }

  // protected route
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'ERROR: Forbidden' })
  }

  try {
    const images = JSON.parse(req.body)
    const conn = await connect()
    const db = conn.db()
  
    // update positions
    for (let i = 0; i < images.length; i++) {
      if (images[i].position !== images.length - 1 - i) {
        await db.collection('posts').findOneAndUpdate(
          { _id: new ObjectId(images[i]._id) }, 
          {
            $set: { position: images.length - 1 - i }
          }
        )
      }
    }
  
    // update descriptions
    const docs = await db.collection('posts').find({}).sort({ position: -1 }).toArray()
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].description !== images[i].description) {
        await db.collection('posts').findOneAndUpdate(
          { _id: docs[i]._id },
          {
            $set: { description: images[i].description }
          }
        )
      }
    }

    conn.close()
    return res.json({ message: 'coooool' })
  } catch(err) {
    return res.status(500).json({ message: 'internal server error...' })
  }
  
}