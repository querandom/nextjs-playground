import path from 'path'
import fs from 'fs/promises'

import { GetStaticProps } from 'next/types'
import Link from 'next/link'
import { Product } from '../types/product'

export interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <ol>
        {products?.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

async function getData(): Promise<{ products: Product[] }> {
  const pathname = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const fileData = await fs.readFile(pathname)
  const data = JSON.parse(fileData.toString())

  return data
}

export const getStaticProps: GetStaticProps<HomeProps | {}> = async () => {
  console.log('(Re-)Generating...')

  const data = await getData()

  if (!data) {
    return {
      redirect: {
        destination: '/fallback-page',
      },
      props: {},
    }
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
      props: {},
    }
  }

  return { props: data, revalidate: 10 }
}
