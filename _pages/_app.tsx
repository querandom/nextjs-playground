import RootLayout from '@/app/layout'

import '@/app/globals.css'
import MainHeader from '@/components/main-header/main-header'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MainHeader />
      <Component {...pageProps} />
    </>
  )
}
