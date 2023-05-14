import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/lib/db'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // this route NEEDS to be protected asap
  if (req.method !== 'POST') {
    res.status(422).json({ message: 'Route not valid' })
    return
  }
  console.log(req.body.id)

  const conn = await connect()
  const db = conn.db()
  const status = await db.collection('posts').findOneAndDelete({ _id: new ObjectId(req.body.id) })
  if (!status || !status.ok) {
    res.status(500).json({message: 'server error'})
  }
  conn.close()

  res.status(200).json({ message: 'success' })
}