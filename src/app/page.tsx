import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>This is the Home Page</h1>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  )
}
