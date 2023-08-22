import '@/app/globals.css'
import Layout from '@/components/layout/layout'
import { NotificationContextProvider } from '@/store/notification-context'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width" />
        </Head>
        <Component {...pageProps} />
        {/* <Notification title message status /> */}
      </Layout>
    </NotificationContextProvider>
  )
}
