import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import { AwesomeEvent } from '@/data/types'
import { filterFeaturedEvents } from '@/data/utils'
import { GetStaticProps } from 'next'
import Head from 'next/head'

export interface HomeProps {
  events: AwesomeEvent[]
}

export default function Home({ events }: any) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="This is description for engine crawlers."
        />
      </Head>

      <EventList items={events} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('(Re-)Validating featured events')

  try {
    const events = await fetchEvents()
    const featuredEvents = filterFeaturedEvents(events)

    return {
      props: {
        events: featuredEvents,
      },
      revalidate: 10,
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/fallback-page',
      },
      props: {},
    }
  }
}
