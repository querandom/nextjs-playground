import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import { AwesomeEvent } from '@/data/types'
import { filterFeaturedEvents } from '@/data/utils'
import { GetStaticProps } from 'next'

export interface HomeProps {
  events: AwesomeEvent[]
}

export default function Home({ events }: any) {
  return (
    <div>
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
