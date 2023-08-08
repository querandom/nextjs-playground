import path from 'path'
import fs from 'fs/promises'

import { GetStaticPaths, GetStaticProps } from 'next/types'
import { Product } from '../../types/product'

export interface ProductDetailPageProps {
  product: Product
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  )
}

async function getData(): Promise<{ products: Product[] }> {
  const pathname = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const fileData = await fs.readFile(pathname)
  const data = JSON.parse(fileData.toString())

  return data
}

export const getStaticProps: GetStaticProps<
  ProductDetailPageProps | {}
> = async (context) => {
  const { params } = context
  const productId = params?.pid

  const data = await getData()

  if (!data) {
    return {
      redirect: {
        destination: '/fallback-page',
      },
      props: {},
    }
  }

  const product = data.products.find((p) => p.id === productId)

  // this makes more sense when using fallback: true
  if (!product) {
    return {
      notFound: true,
    }
  }

  return { props: { product }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<{ pid: string }> = async () => {
  const data = await getData()

  const ids = data.products.map((p) => p.id)
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))

  return {
    paths: pathsWithParams,
    // paths can be static
    // paths: [
    //   { params: { pid: 'p1' } },
    //   { params: { pid: 'p2' } },
    //   { params: { pid: 'p3' } },
    // ],
    // does not render a page if the id is not in the list
    // fallback: false,
    // Render the page even if the id is not in the list
    fallback: true,
    // blocks the rendering to fetch the data before sending the response to the user
    // fallback: 'blocking',
  }
}
