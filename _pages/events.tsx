import EventsSearchBar from '@/app/events/events-search-bar'
import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import { AwesomeEvent } from '@/data/types'
import Head from 'next/head'
import { GetStaticProps } from 'next/types'

export interface EventsPageProps {
  events: AwesomeEvent[]
}

export default function EventsPage({ events }: EventsPageProps) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="All events" />
      </Head>
      <EventsSearchBar />
      <EventList items={events} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('(Re-)Validating all events')

  try {
    const events = await fetchEvents()

    return {
      props: {
        events,
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
