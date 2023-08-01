import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import ErrorAlert from '@/components/ui/error-alert'
import { getEventById } from '@/data/dummy-data'

export interface EventDetailProps {
  params: { id: string }
}

export default function EventDetail({ params }: EventDetailProps) {
  const { id } = params
  const event = getEventById(id)

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
