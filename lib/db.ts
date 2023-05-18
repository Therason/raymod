import { MongoClient } from 'mongodb'

export default async function connect() {
  const conn = await MongoClient.connect(process.env.MONGO_URL)
  return conn
}
