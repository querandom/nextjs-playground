import RootLayout from '@/app/layout'

import '@/app/globals.css'
import MainHeader from '@/components/main-header/main-header'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <MainHeader />
      <Component {...pageProps} />
    </>
  )
}
