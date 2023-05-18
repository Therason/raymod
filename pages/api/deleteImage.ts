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
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'ERROR: Forbidden' })
  }

  try {
    const conn = await connect()
    const db = conn.db()
    const status = await db.collection('posts').findOneAndDelete({ _id: new ObjectId(req.body.id) })
    if (!status || !status.ok) {
      return res.status(500).json({message: 'database error'})
    }

    conn.close()
    return res.status(200).json({ message: 'success' })
  } catch(err) {
    return res.status(500).json({ message: 'internal server error...' })
  }
}