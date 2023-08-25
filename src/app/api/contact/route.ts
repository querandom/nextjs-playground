import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

interface Body {
  email?: string
  name?: string
  message?: string
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json()

  const { email, name, message } = body

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() == ''
  ) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 422 })
  }

  const newMessage = {
    email,
    name,
    message,
  }

  let client
  try {
    client = await MongoClient.connect(process.env.MONGODB_URL || '')
  } catch (e: any) {
    console.error('Error connecting to DB', e?.message)
    return NextResponse.json(
      { message: 'Could not connect to DB.' },
      { status: 500 }
    )
  }

  const db = client.db()
  let response
  try {
    await db.collection('messages').insertOne(newMessage)

    response = NextResponse.json(
      { message: 'Message was saved successfully' },
      { status: 201 }
    )
  } catch (e: any) {
    console.log('Could not save the message to DB.', e?.message)

    response = NextResponse.json(
      { message: 'Could not save the message to DB.' },
      { status: 500 }
    )
  } finally {
    client.close()
  }

  return response
}
