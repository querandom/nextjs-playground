import { getDBClient, insertOneInCollection } from '@/db'

export async function POST(req: Request) {
  const body = await req.json()
  const userEmail = body?.email

  if (!userEmail || userEmail.trim() === '' || !userEmail.includes('@')) {
    return new Response(JSON.stringify({ message: 'invalid email format' }), {
      status: 400,
    })
  }

  const client = await getDBClient()
  await insertOneInCollection(client, 'newsletter', 'emails', {
    email: userEmail,
  })

  client.close()

  return new Response(JSON.stringify({ message: 'signed up!' }), {
    status: 201,
  })
}
