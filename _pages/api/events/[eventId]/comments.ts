import {
  getAllCollectionDocuments,
  getDBClient,
  insertOneInCollection,
} from '@/db'
import type { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query?.eventId

  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    const {
      email,
      name,
      text,
    }: { email?: string; name?: string; text?: string } = body

    if (
      !email?.trim() ||
      !name?.trim() ||
      !text?.trim() ||
      !email.includes('@')
    ) {
      res.status(400).json({ message: 'Invalid data' })
      return
    }

    const newComment: {
      email: string
      name: string
      text: string
      id?: any
    } = {
      email,
      name,
      text,
    }

    const client = await getDBClient()
    const insertResult = await insertOneInCollection(
      client,
      'events',
      `${eventId}/comments`,
      newComment
    )
    client.close()
    newComment.id = insertResult.insertedId

    return res.status(201).json({ comment: newComment })
  } else if (req.method === 'GET') {
    const client = await getDBClient()
    const commentsCollection = await getAllCollectionDocuments(
      client,
      'events',
      `${eventId}/comments`,
      { _id: -1 }
    )

    client.close()

    return res.status(200).json({
      comments: commentsCollection.map(({ _id, ...rest }) => ({
        // property rename
        id: _id,
        ...rest,
      })),
    })
  }
}
