import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Layout from '@/components/layout/layout'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Pablo's blog`,
  description: 'Personal blog',
  viewport: 'with=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        {/* Element to create a portal */}
        <div id="notification" />
      </body>
    </html>
  )
}
