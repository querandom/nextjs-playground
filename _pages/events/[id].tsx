import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import ErrorAlert from '@/components/ui/error-alert'
import { fetchEvents } from '@/data/fetch-events'
import { AwesomeEvent } from '@/data/types'
import { getEventById } from '@/data/utils'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next/types'

export interface EventDetailProps {
  event: AwesomeEvent
}

export default function EventDetail({ event }: EventDetailProps) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>Event not found</p>
      </ErrorAlert>
    )
  }

  return (
    <>
      <Head>
        <title>{`NextJS Event: ${event?.title}`}</title>
        <meta
          name="description"
          content={`This is the event detail ${event?.title}`}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export const getStaticProps: GetStaticProps<EventDetailProps | {}> = async (
  context
) => {
  const { params } = context
  const id = params?.id

  const events = await fetchEvents()

  if (typeof id !== 'string') {
    return {
      redirect: {
        destination: '/fallback-page',
      },
      props: {},
    }
  }

  const event = getEventById(events || [], id)

  return { props: { event }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const events = await fetchEvents()
  const pathsWithParams = events.map((e) => ({ params: { id: e.id } }))

  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  }
}
