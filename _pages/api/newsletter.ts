import { getDBClient, insertOneInCollection } from '@/db'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const userEmail = JSON.parse(req.body).email

    if (!userEmail || userEmail.trim() === '' || !userEmail.includes('@')) {
      res.status(400).json({ message: 'invalid email format' })
      return
    }

    const client = await getDBClient()
    await insertOneInCollection(client, 'newsletter', 'emails', {
      email: userEmail,
    })

    client.close()

    res.status(201).json({ message: 'signed up!' })
    return
  }
}
