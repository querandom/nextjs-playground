import path from 'path'
import fs from 'fs/promises'

import { notFound, redirect } from 'next/navigation'

import { Product } from '../../../../types/product'

export interface ProductDetailPageProps {
  params: {
    pid: string
  }
}

export default async function ProductDetailPage({
  params: { pid },
}: ProductDetailPageProps) {
  console.log('pid', pid)

  const data = await getData()
  if (!data) {
    // redirect
    console.log('redirecting')

    redirect('/fallback-page')
  }

  const product = data.products.find((p) => p.id === pid)
  console.log('product', product)

  if (!product) {
    // 404
    console.log('not found')
    notFound()
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

export const revalidate = 10
// export const fallback = false

export const generateStaticParams = async () => {
  const data = await getData()

  const ids = data.products.map((p) => p.id)
  const pathsWithParams = ids.map((id) => ({ pid: id }))

  return pathsWithParams
  // return {

  // does not render a page if the id is not in the list
  // fallback: false,
  // Render the page even if the id is not in the list
  // fallback: true,
  // blocks the rendering to fetch the data before sending the response to the user
  // fallback: 'blocking',
  // }
}
