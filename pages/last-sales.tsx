import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import useSWR from 'swr'

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
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function LastSalesPage(props: { sales: Sales[] }) {
  const [sales, setSales] = useState<Sales[]>(props.sales)

  const { data, error } = useSWR<StoreData>(
    'https://nextjs-course-2a798-default-rtdb.firebaseio.com/sales.json',
    fetcher
  )
  useEffect(() => {
    if (data) {
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
    }
  }, [data])
  if (error) {
    return <h2>Error loading data.</h2>
  }

  if (!data && !sales) {
    return <h2>Loading...</h2>
  }

  // const [isLoading, setIsLoading] = useState(false)
  // useEffect(() => {
  //   setIsLoading(true)

  //   fetch('https://nextjs-course-2a798-default-rtdb.firebaseio.com/sales.json')
  //     .then((res) => res.json())
  //     .then((data: StoreData) => {
  //       const transformedData: Sales[] = []

  //       for (let key in data) {
  //         const current = data[key]

  //         transformedData.push({
  //           id: key,
  //           username: current?.username || '',
  //           volume: current?.volume || '',
  //         })
  //       }
  //       setSales(transformedData)
  //       setIsLoading(false)
  //     })
  // }, [])

  // if (isLoading) {
  //   return <h2>Loading...</h2>
  // }

  // if (!sales) {
  //   return <h2>No Data Yet!</h2>
  // }

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

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://nextjs-course-2a798-default-rtdb.firebaseio.com/sales.json'
  )
  const data = await response.json()
  const transformedData: Sales[] = []

  for (let key in data) {
    const current = data[key]

    transformedData.push({
      id: key,
      username: current?.username || '',
      volume: current?.volume || '',
    })
  }

  return {
    props: {
      sales: transformedData,
    },
    // needed to re-execute the function
    revalidate: 10,
  }
}
