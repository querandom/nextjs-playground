import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import ErrorAlert from '@/components/ui/error-alert'
import { fetchEvents } from '@/data/fetch-events'
import { AwesomeEvent } from '@/data/types'
import { getEventById } from '@/data/utils'

export interface EventDetailProps {
  params: { id: string }
}

export default async function EventDetail({ params }: EventDetailProps) {
  const { id } = params
  const events = await fetchEvents()
  const event = getEventById(events, id)

  if (!event) {
    return (
      <ErrorAlert>
        <p>Event not found</p>
      </ErrorAlert>
    )
  }

  return (
    <>
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

export const revalidate = 60
export const generateStaticParams = async () => {
  const events = await fetchEvents()

  return events.map((event) => ({
    id: event.id,
  }))
}
