import './globals.css'
import MainHeader from '@/components/main-header/main-header'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const OpenSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS Events',
  description: 'Events for everyone.',
  viewport: 'width=device-width, initial-scale=2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={OpenSans.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  )
}
