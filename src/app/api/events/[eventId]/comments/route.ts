import { NextResponse } from 'next/server'

import {
  getAllCollectionDocuments,
  getDBClient,
  insertOneInCollection,
} from '@/db'

interface PostBody {
  email?: string
  name?: string
  text?: string
}

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const eventId = params.eventId
  const body: PostBody = await req.json()
  const { email, name, text } = body

  if (
    !email?.trim() ||
    !name?.trim() ||
    !text?.trim() ||
    !email.includes('@')
  ) {
    return new Response(JSON.stringify({ message: 'Invalid data' }), {
      status: 400,
    })
  }

  const newComment = {
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
  const comment = {
    id: insertResult.insertedId,
    ...newComment,
  }

  return new Response(JSON.stringify({ comment }), {
    status: 201,
  })
}

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  const eventId = params.eventId

  const client = await getDBClient()
  const commentsCollection = await getAllCollectionDocuments(
    client,
    'events',
    `${eventId}/comments`,
    { _id: -1 }
  )

  client.close()

  return NextResponse.json({
    comments: commentsCollection.map(({ _id, ...rest }) => ({
      // property rename
      id: _id,
      ...rest,
    })),
  })
}
