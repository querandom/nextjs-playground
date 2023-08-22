import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import Comments from '@/components/input/comments'
import ErrorAlert from '@/components/ui/error-alert'
import { fetchEvents } from '@/data/fetch-events'
import { getEventById } from '@/data/utils'
import { Metadata } from 'next'
import Head from 'next/head'

interface PageParams {
  id: string
}
export interface EventDetailProps {
  params: PageParams
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  // read route params
  const id = params.id

  const event = await getEvent(id)
  return {
    title: `NextJS Event: ${event?.title}`,
    description: `This is the event detail ${event?.title}`,
  }
}

async function getEvent(id: string) {
  const events = await fetchEvents()
  const event = getEventById(events, id)

  return event
}

export default async function EventDetail({ params }: EventDetailProps) {
  const { id } = params
  const event = await getEvent(id)

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
        <title>NextJS Events</title>
        <meta
          name="description"
          content={`This is the event detail ${event.title}`}
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
        <Comments eventId={event.id} />
      </EventContent>
    </>
  )
}

export const revalidate = 60
export const generateStaticParams = async () => {
  const events = await fetchEvents()

  return events.map((event) => ({
    id: event.id,
  }))
}
