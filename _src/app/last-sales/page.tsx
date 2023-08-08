'use client'
import { useEffect, useState } from 'react'

interface StoreData {
  [key: string]: {
    username: string
    volume: string
  }
}

interface Sales {
  id: string
  username: string
  volume: string
}

export default function LastSalesPage() {
  const [sales, setSales] = useState<Sales[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch('https://nextjs-course-2a798-default-rtdb.firebaseio.com/sales.json')
      .then((res) => res.json())
      .then((data: StoreData) => {
        const transformedData: Sales[] = []

        for (let key in data) {
          const current = data[key]

          transformedData.push({
            id: key,
            username: current?.username || '',
            volume: current?.volume || '',
          })
        }
        setSales(transformedData)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (!sales) {
    return <h2>No Data yet!</h2>
  }

  return (
    <ul>
      {sales.map((s) => (
        <li key={s.id}>
          {s.username} - ${s.volume}
        </li>
      ))}
    </ul>
  )
}
