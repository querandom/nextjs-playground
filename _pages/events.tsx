import EventsSearchBar from '@/app/events/events-search-bar'
import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import { AwesomeEvent } from '@/data/types'
import { GetStaticProps } from 'next/types'

export interface EventsPageProps {
  events: AwesomeEvent[]
}

export default function EventsPage({ events }: EventsPageProps) {
  return (
    <>
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
