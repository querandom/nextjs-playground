import path from 'path'
import fs from 'fs/promises'

export default async function Home() {
  const pathname = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const fileData = await fs.readFile(pathname)
  const products: {
    products: {
      id: string
      title: string
    }[]
  } = JSON.parse(fileData.toString())

  return (
    <div>
      <ol>
        {products.products?.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ol>
    </div>
  )
}
